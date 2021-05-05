from app.models import db, User, Server
from random import randint


def seed_server_members():
    tracker = set()

    for i in range(100):
        user_id = randint(1, 88)
        server_id = randint(1, 25)

        tup = (user_id, server_id)

        if tup in tracker:
            continue

        tracker.add(tup)
        user = User.query.get(user_id)
        server = Server.query.get(server_id)
        user.joined_servers.append(server)
        db.session.commit()


def undo_server_members():
    db.session.execute(
        'TRUNCATE server_members RESTART IDENTITY CASCADE;')
    db.session.commit()
