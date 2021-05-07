from app.models import db, Server
from faker import Faker
from random import randint

fake = Faker()


def seed_servers():
    for i in range(25):
        user_id = randint(1, 88)
        server_name = fake.word()
        public = fake.pybool()

        server = Server(user_id=user_id,
                        server_name=server_name, public=public)
        db.session.add(server)
        db.session.commit()


def undo_servers():
    db.session.execute("TRUNCATE servers RESTART IDENTITY CASCADE;")
    db.session.commit()
