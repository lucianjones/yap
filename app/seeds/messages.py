from app.models import db, Message, Channel
from faker import Faker
from random import randint

fake = Faker()
channel_triplets = [(user_id, server_id, channel_id)
                    for channel.user_id, channel.server_id, channel.id
                    in Channel.query.all]

def seed_messages():
    for i in range(2000):
        channel_triplet = channel_triplets[randint(125)]
        user_id = channel_triplet[0]
        server_id = channel_triplet[1]
        channel_id = channel_triplet[2]
        body = fake.paragraph(nb_sentences=5)
#        image_url = ''    --- not sure if i have to provide a none val
        created_at = fake.date()
        updated_at = fake.date()

        message = Message(user_id, server_id, channel_id, body, created_at, updated_at)
        db.session.add(message)
        db.session.commit()

def undo_messages():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
