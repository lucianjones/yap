from flask import Blueprint, jsonify
from flask_login import login_required

channel_routes = Blueprint("channels", __name__)


@channel_routes.route("/<int:id>")
@login_required
def get_channel(id):
    pass


@channel_routes.route("/", methods=["POST"])
@login_required
def post_channel():
    pass


@channel_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_channel():
    pass


@channel_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_channel():
    pass
