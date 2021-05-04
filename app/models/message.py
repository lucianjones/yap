from .db import db
from datetime import datetime


class Message(db.Model):
    __tablename__ = "messages"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    server_id = db.Column(
        db.ForeignKey("servers.id", ondelete="CASCADE"), nullable=False
    )
    channel_id = db.Column(
        db.ForeignKey("channels.id", ondelete="CASCADE"), nullable=False
    )
    body = db.Column(db.String(1000), nullable=False)
    image_url = db.Column(db.String(100), nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now)

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "server_id": self.server_id,
            "channel_id": self.channel_id,
            "body": self.body,
            "image_url": self.image_url,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
