import ast
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.forms import ChannelForm
from app.models import db, Channel

channel_routes = Blueprint("channels", __name__)


def validation_errors_to_error_messages(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages


@channel_routes.route("/<int:id>")
@login_required
def get_channel(id):
    pass


@channel_routes.route("", methods=["POST"])
@login_required
def post_channel():
    print(request.data)
    form = ChannelForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        channel = Channel(
            user_id=current_user.get_id(),
            server_id=form.data["server_id"],
            channel_name=form.data["channel_name"],
            public=form.data["public"],
        )
        db.session.add(channel)
        db.session.commit()
        return channel.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


@channel_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_channel(id):
    cur_usr = int(current_user.get_id())
    dict_str = request.data.decode("UTF-8")
    data = ast.literal_eval(dict_str)["message"]
    channel = Channel.query.get(id)
    if cur_usr == channel.user_id:
        channel.channel_name = data["channel_name"]
        db.session.add(channel)
        db.session.commit()
        return {"status": 200}
    return {"status": 401}


@channel_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_channel(id):
    cur_usr = int(current_user.get_id())
    channel = Channel.query.get(id)
    if cur_usr == channel.user_id:
        db.session.delete(channel)
        db.session.commit()
        return {"status": 200}
    return {"status": 401}
