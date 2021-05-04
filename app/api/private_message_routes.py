from flask import Blueprint, jsonify
from flask_login import login_required

private_message_routes = Blueprint("private-messages", __name__)


@private_message_routes.route("/")
@login_required
def get_private_message():
    pass


@private_message_routes.route("/", methods=["POST"])
@login_required
def post_private_message():
    pass


@private_message_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_private_message():
    pass


@private_message_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_private_message():
    pass
