from .db import db


class Server(db.Model):
    __tablename__ = "servers"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.ForeignKey(
        "users.id", ondelete="CASCADE"), nullable=False)
    server_name = db.Column(db.String(50), nullable=False)
    public = db.Column(db.Boolean, nullable=False)
    channels = db.relationship(
        "Channel", backref="servers", cascade="all, delete", passive_deletes=True
    )
    messages = db.relationship(
        "Message", backref="servers", cascade="all, delete", passive_deletes=True
    )

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "server_name": self.server_name,
            "public": self.public,
            "channels": [channel.to_dict() for channel in self.channels],
            "messages": [message.to_dict() for message in self.messages],
        }
