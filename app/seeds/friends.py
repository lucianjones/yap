from app.models import db, User
from random import randint


def seed_friends():
    tracker = set()

    for i in range(1000):
        user_id_1 = randint(1, 88)
        user_id_2 = randint(1, 88)

        if user_id_1 == user_id_2:
            continue

        tup = (user_id_1, user_id_2)
        bar_tup = (user_id_2, user_id_1)

        if tup in tracker or bar_tup in tracker:
            continue

        tracker.add(tup)
        user_1 = User.query.get(user_id_1)
        user_2 = User.query.get(user_id_2)
        user_1.friends.append(user_2)
        db.session.commit()


def undo_friends():
    db.session.execute(
        'TRUNCATE friends_table RESTART IDENTITY CASCADE;')
    db.session.commit()
