from flask_login import login_required, current_user
from flask_socketio import emit, join_room, leave_room

from app.models import db, Message, Channel
from app import socketio


@socketio.on("join")
def on_join(data):
    room = data["room"]
    join_room(room)


@socketio.on("leave")
def on_leave(data):
    room = data["room"]
    leave_room(room)


@socketio.on("message_update")
def message_update(data):
    room = data["room"]
    emit("dispatch_messages", broadcast=True, to=room)
