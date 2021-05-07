from app.models import db, Recipient, PrivateMessage
from random import randint


def seed_recipients():
    messages = PrivateMessage.query.all()
    for message in messages:
        private_message_id = message.id
        while True:
            rand = randint(1, 88)
            if rand == message.user_id:
                continue
            else:
                break
        user_id = rand

        recipient = Recipient(
            user_id=user_id, private_message_id=private_message_id)
        db.session.add(recipient)
        db.session.commit()


def undo_recipients():
    db.session.execute("TRUNCATE recipients RESTART IDENTITY CASCADE;")
    db.session.commit()
