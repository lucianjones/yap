from app.models import db, Channel, Server
from faker import Faker
from random import randint

fake = Faker()
server_pairs = [(user_id, server_id) for server.user_id, server.id in server.query.all]

def seed_channels():
    for i in range(125):
        server_pair = server_pairs[randint(25)]
        user_id = server_pair[0]
        server_id = server_pair[1]
        channel_name = fake.word()
        public = fake.pybool()

        channel = Channel(server_id, user_id, channel_name, public)
        db.session.add(channel)
        db.session.commit()


def undo_channels():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
