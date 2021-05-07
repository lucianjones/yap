from app.models import db, Message, User
from faker import Faker

fake = Faker()


def seed_messages():

    for user in User.query.all():
        i = 0
        for channel in user.joined_channels:
            i += 1
            if i > 20:
                break
            channel_id = channel.id
            server_id = channel.server_id
            user_id = user.id
            body = fake.paragraph(nb_sentences=5)
            created_at = fake.date()
            updated_at = fake.date()

            message = Message(
                user_id=user_id,
                server_id=server_id,
                channel_id=channel_id,
                body=body,
                created_at=created_at,
                updated_at=updated_at,
            )

            db.session.add(message)
            db.session.commit()
        i = 0


def undo_messages():
    db.session.execute("TRUNCATE messages RESTART IDENTITY CASCADE;")
    db.session.commit()
