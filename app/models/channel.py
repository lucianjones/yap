from .db import db


class Channel(db.Model):
    __tablename__ = "channels"

    id = db.Column(db.Integer, primary_key=True)
    server_id = db.Column(
        db.ForeignKey("servers.id", ondelete="CASCADE"), nullable=False
    )
    user_id = db.Column(db.ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    channel_name = db.Column(db.String(50), nullable=False)
    public = db.Column(db.Boolean, nullable=False)
    messages = db.relationship(
        "Message", backref="channels", cascade="all, delete", passive_deletes=True
    )

    def to_dict(self):
        return {
            "id": self.id,
            "server_id": self.server_id,
            "user_id": self.user_id,
            "channel_name": self.channel_name,
            "public": self.public,
            "messages": [message.to_dict() for message in self.messages],
        }
