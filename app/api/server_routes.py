from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Server, User

server_routes = Blueprint("servers", __name__)


@server_routes.route("/")
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


@server_routes.route("/", methods=["POST"])
@login_required
def post_server():
    user_id = current_user.get_id()
    server_name = request.form["server_name"]
    public = request.form["public"]
    if public == "true":
        public = True
    else:
        public = False

    new_server = Server(user_id=user_id, server_name=server_name, public=public)

    db.session.add(new_server)
    db.session.commit()
    return {201: "Post Successful"}


@server_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_server(id):
    user_id = current_user.get_id()
    server = Server.query.get(id)
    if user_id != server.user_id:
        return {403: "Access Denied"}
    server_name = request.form["server_name"]
    public = request.form["public"]

    if public == "true":
        public = True
    else:
        public = False

    server.server_name = server_name
    server.public = public

    db.session.commit()
    return {200: "Put Successful"}


@server_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_server(id):
    user_id = current_user.get_id()
    server = Server.query.get(id)
    if user_id != server.user_id:
        return {403: "Access Denied"}
    db.session.delete(server)
    db.session.commit()
    return {204: "Delete Successful"}
