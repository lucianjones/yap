from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

friends_table = db.Table(
    "friends_table",
    db.Column("user_id_1", db.Integer, db.ForeignKey("users.id")),
    db.Column("user_id_2", db.Integer, db.ForeignKey("users.id")),
)


class User(db.Model, UserMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    pic_url = db.Column(db.String(255), nullable=True)
    first_name = db.Column(db.String(50), nullable=True)
    last_name = db.Column(db.String(50), nullable=True)
    servers = db.relationship(
        "Server", backref="users", cascade="all, delete", passive_deletes=True
    )
    channels = db.relationship(
        "Channel", backref="users", cascade="all, delete", passive_deletes=True
    )
    messages = db.relationship(
        "Message", backref="users", cascade="all, delete", passive_deletes=True
    )
    private_messages = db.relationship(
        "PrivateMessage", backref="users", cascade="all, delete", passive_deletes=True
    )
    friends = db.relationship(
        "User",
        secondary=friends_table,
        primaryjoin=id == friends_table.c.user_id_1,
        secondaryjoin=id == friends_table.c.user_id_2,
        backref=db.backref("friends_table", lazy="joined"),
        lazy="joined",
    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "pic_url": self.pic_url,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "servers": [server.to_dict() for server in self.servers],
            "channels": [channel.to_dict() for channel in self.channels],
            "messages": [message.to_dict() for message in self.messages],
            "friends": [friend for friend in self.friend],
            "private_message": [
                private_message.to_dict() for private_message in private_message
            ],
        }
