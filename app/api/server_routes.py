from flask import Blueprint, jsonify
from flask_login import login_required

server_routes = Blueprint("servers", __name__)


@server_routes.route("/<int:id>")
@login_required
def get_server(id):
    pass


@server_routes.route("/", methods=["POST"])
@login_required
def post_server():
    pass


@server_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_server():
    pass


@server_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_server():
    pass
