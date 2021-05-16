import ast
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Server, User
from app.forms import ServerForm

server_routes = Blueprint("servers", __name__)


def validation_errors_to_error_messages(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages


@server_routes.route("")
@login_required
def get_servers():
    user_id = current_user.get_id()
    user = User.query.get(user_id)
    servers = user.joined_servers
    return {"servers": [server.to_dict() for server in servers]}


@server_routes.route("/<int:id>")
@login_required
def get_joined_server(id):
    server = Server.query.get(id)
    return server.to_dict()


@server_routes.route("", methods=["POST"])
@login_required
def post_server():
    user_id = current_user.get_id()
    form = ServerForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        user = User.query.get(user_id)
        server = Server(
            user_id=user_id,
            server_name=form.data["server_name"],
            public=form.data["public"],
        )

        db.session.add(server)
        user.joined_servers.append(server)
        db.session.commit()
        return server.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


@server_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_server(id):
    user_id = current_user.get_id()
    server = Server.query.get(id)
    print(request.data, "%$#$$@#$%_!#%$#%!@#%!@#$%")
    dict_str = request.data.decode("UTF-8")
    data = ast.literal_eval(dict_str)["update"]
    if user_id != server.user_id:
        return {403: "Access Denied"}
    public = data["public"]

    if public == "true":
        public = True
    else:
        public = False

    server.server_name = data["server_name"]
    server.public = public

    db.session.commit()
    return {200: "Put Successful"}


@server_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_server(id):
    user_id = current_user.get_id()
    server = Server.query.get(id)
    res_serv = server.to_dict()
    print("alsd;kfjas;lkdjf;laskdjf;lkasjdf;lkasjdlf")
    db.session.delete(server)
    db.session.commit()
    return {"server": res_serv}
