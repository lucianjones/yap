from app.models import db, PrivateMessage
from faker import Faker
from random import randint

fake = Faker()


def seed_private_messages():
    for i in range(500):
        body = fake.paragraph(nb_sentences=5)
        created_at = fake.date()
        updated_at = fake.date()
        user_id = randint(1, 88)

        pm = PrivateMessage(
            body=body, created_at=created_at, updated_at=updated_at, user_id=user_id
        )
        db.session.add(pm)
        db.session.commit()


def undo_private_messages():
    db.session.execute("TRUNCATE private_messages RESTART IDENTITY CASCADE;")
    db.session.commit()
