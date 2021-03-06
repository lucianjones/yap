import os
from flask import Flask, request, session, redirect, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager

from flask_socketio import SocketIO, send, emit
from engineio.payload import Payload


from .seeds import seed_commands
from .config import Config

from .models import db, User
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.server_routes import server_routes
from .api.channel_routes import channel_routes
from .api.message_routes import message_routes
from .api.private_message_routes import private_message_routes


app = Flask(__name__)
## Setup login manager
login = LoginManager(app)
login.login_view = "auth.unauthorized"


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


Payload.max_decode_packets = 500
socketio = SocketIO(app, cors_allowed_origins="*", logger=True)
if __name__ == "__init__":
    socketio.run(app)

# Tell flask about our seed commands
app.cli.add_command(seed_commands)

# Import config
app.config.from_object(Config)

# Import sockets
from .sockets.messages import message_update

# Register routes
app.register_blueprint(user_routes, url_prefix="/api/users")
app.register_blueprint(auth_routes, url_prefix="/api/auth")
app.register_blueprint(server_routes, url_prefix="/api/servers")
app.register_blueprint(channel_routes, url_prefix="/api/channels")
app.register_blueprint(message_routes, url_prefix="/api/messages")
app.register_blueprint(private_message_routes, url_prefix="/api/private-messages")

# Initialize our databases
db.init_app(app)
Migrate(app, db)

# Make sure cross-origin is enebled
CORS(app, supports_credentials=True)

# Since we are deploying with Docker and Flask,
# we won't be using a buildpack when we deploy to Heroku.
# Therefore, we need to make sure that in production any
# request made over http is redirected to https.


# Well.........


@app.before_request
def https_redirect():
    if os.environ.get("FLASK_ENV") == "production":
        if request.headers.get("X-Forwarded-Proto") == "http":
            url = request.url.replace("http://", "https://", 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        "csrf_token",
        generate_csrf(),
        secure=True if os.environ.get("FLASK_ENV") == "production" else False,
        samesite="Strict" if os.environ.get("FLASK_ENV") == "production" else None,
        httponly=True,
    )
    return response


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def react_root(path):
    print("path", path)
    if path == "favicon.ico":
        return app.send_static_file("favicon.ico")
    return app.send_static_file("index.html")


@socketio.on("connect")
def test_connect():
    print("Client connected")
    emit({"data": "Connected"}, include_self=True)


@socketio.on("disconnect")
def test_disconnect():
    print("Client disconnected")
