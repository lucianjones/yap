from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Server

server_routes = Blueprint("servers", __name__)


@server_routes.route("/<int:id>")
@login_required
def get_server(id):
    server = Server.query.get(id)
    return server.to_dict()


@server_routes.route("/", methods=["POST"])
@login_required
def post_server():
    user_id = current_user.get_id()
    server_name = request.form['server_name']
    public = request.form['public']

    new_server = Server(user_id=user_id,
                        server_name=server_name,
                        public=public
                        )

    db.session.add(new_server)
    db.session.commit()
    return {201: 'Post Successful'}


@server_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_server(id):
    server = Server.query.get(id)
    server_name = request.form['server_name']
    public = request.form['public']
    server.server_name = server_name
    server.public = public

    db.session.commit()
    return {200: 'Put Successful'}


@server_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_server(id):
    user_id = int(current_user.get_id())
    server = Server.query.get(id)
    if user_id != server.userId:
        return {403: 'Access Denied'}
    db.session.delete(server)
    db.session.commit()
    return {204: 'Delete Successful'}
