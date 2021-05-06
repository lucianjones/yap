import ast

from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Message

message_routes = Blueprint("messages", __name__)


@message_routes.route("/<int:cid>")
@login_required
def get_messages(cid):
    results = Message.query.filter(Message.channel_id == cid).all()
    messages = [result.to_dict() for result in results]

    return {"messages": messages}


@message_routes.route("", methods=["POST"])
@login_required
def post_message():
    cur_user_id = int(current_user.get_id())
    dict_str = request.data.decode("UTF-8")
    data = ast.literal_eval(dict_str)["message"]
    print("########", data)

    message = Message()
    message.user_id = data["user_id"]
    message.server_id = data["server_id"]
    message.channel_id = data["channel_id"]
    message.body = data["body"]

    db.session.add(message)
    db.session.commit()

    results = Message.query.filter(Message.channel_id == data["channel_id"]).all()
    messages = [result.to_dict() for result in results]

    return {"messages": messages}


@message_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_message():
    pass


@message_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_message():
    pass
