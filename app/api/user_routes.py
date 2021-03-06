from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User

user_routes = Blueprint("users", __name__)


@user_routes.route("/")
@login_required
def get_users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route("/<int:id>")
@login_required
def get_user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_user(id):
    pass


@user_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_user(id):
    pass


@user_routes.route("/<int:id>/friends")
@login_required
def get_friends(id):
    pass


@user_routes.route("<int:id>/friends", methods=["POST"])
@login_required
def post_friend(id):
    pass


@user_routes.route("<int:id>/friends/<int:fid>", methods=["DELETE"])
@login_required
def delete_friend(id, fid):
    pass
