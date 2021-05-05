from .db import db


class Recipient(db.Model):
    __tablename__ = "recipients"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    private_message_id = db.Column(db.ForeignKey("private_messages.id"))
    private_message = db.relationship('PrivateMessage', back_populates='recipient')


    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "private_message_id": self.private_message_id,
        }
