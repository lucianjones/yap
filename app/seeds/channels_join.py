from app.models import db, User


def seed_channel_members():
    tracker = set()

    for i in range(90):
        user_id = i + 1
        user = User.query.get(user_id)
        servers = user.joined_servers
        for server in servers:
            for channel in server.channels:
                tup = (user_id, channel.id)
                if tup in tracker:
                    continue
                tracker.add(tup)
                user.joined_channels.append(channel)
                db.session.commit()


def undo_channel_members():
    db.session.execute("TRUNCATE channel_members RESTART IDENTITY CASCADE;")
    db.session.commit()
