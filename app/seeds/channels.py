from app.models import db, Channel, Server
from faker import Faker
from random import randint

fake = Faker()

def seed_channels():
    server_pairs = [(server.user_id, server.id) for server in Server.query.all()]
    for i in range(125):
        server_pair = server_pairs[randint(0,24)]
        user_id = server_pair[0]
        server_id = server_pair[1]
        channel_name = fake.word()
        public = fake.pybool()

        channel = Channel(server_id=server_id, user_id=user_id, channel_name=channel_name, public=public)
        db.session.add(channel)
        db.session.commit()


def undo_channels():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
