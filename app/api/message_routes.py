import ast

from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from sqlalchemy import desc
from app.models import db, Message

message_routes = Blueprint("messages", __name__)


@message_routes.route("/<int:cid>")
@login_required
def get_messages(cid):
    results = (
        Message.query.filter(Message.channel_id == cid)
        .order_by(desc(Message.created_at))
        .all()
    )
    messages = [result.to_dict() for result in results]

    return {"messages": messages}


@message_routes.route("", methods=["POST"])
@login_required
def post_message():
    dict_str = request.data.decode("UTF-8")
    data = ast.literal_eval(dict_str)["message"]

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
def update_message(id):
    cur_usr = int(current_user.get_id())
    dict_str = request.data.decode("UTF-8")
    data = ast.literal_eval(dict_str)["update"]
    message = Message.query.get(id)
    if cur_usr == message.user_id:
        message.body = data["body"]
        db.session.add(message)
        db.session.commit()
        return {"message": message.to_dict()}
    return {"status": 401}


@message_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_message(id):
    cur_usr = int(current_user.get_id())
    message = Message.query.get(id)
    if cur_usr == message.user_id:
        db.session.delete(message)
        db.session.commit()
        return {"status": 200}
    return {"status": 401}
