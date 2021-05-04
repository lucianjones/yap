from flask import Blueprint, jsonify
from flask_login import login_required

message_routes = Blueprint("messages", __name__)


@message_routes.route("/", methods=["POST"])
@login_required
def post_message():
    pass


@message_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_message():
    pass


@message_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_message():
    pass
