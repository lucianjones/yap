# from werkzeug.security import generate_password_hash
from app.models import db, User
from faker import Faker


fake = Faker()


# Adds a demo user, you can add other users here if you want
def seed_users():
    user_names = [
        "lethalcircular",
        "fantasyfactor",
        "shortbreadafraid",
        "peermackerel",
        "frontalevolve",
        "don’texceed",
        "madguest",
        "pillagercambodian",
        "bellhopjail",
        "ordinarychav",
        "mosqueprincess",
        "gritstable",
        "resolvestandard",
        "goringelderly",
        "hadpot",
        "pointedcupcake",
        "lecturersource",
        "admiredspy",
        "fondattack",
        "niftycompare",
        "hamsterhousing",
        "wrotecocoa",
        "intentionthole",
        "minstrelresemble",
        "pastdoll",
        "nuclearlollies",
        "nonceverifiable",
        "buttondownhillbilly",
        "slippersinsecure",
        "gibbonsputter",
        "gigjogger",
        "existinganyone",
        "effectiveroughly",
        "disruptiveforgetful",
        "speakershallots",
        "evaporatepug",
        "applaudjoy",
        "moreoverdefine",
        "fordlick",
        "categorypleased",
        "laboratoryorigin",
        "modifiedtattered",
        "splendidcleats",
        "judiciouspollution",
        "baseballdefinition",
        "tonguetired",
        "editionwally",
        "seagrassavaricious",
        "charcoalaustere",
        "accountantespresso",
        "ambushlustful",
        "plasticjeans",
        "leafequipment",
        "visortissue",
        "drinkerattribute",
        "chartvigorous",
        "vestalkidneys",
        "unionbroad",
        "perunderclothes",
        "thinkablecobbler",
        "oncedress",
        "cameramanfresh",
        "rompthreads",
        "hissingmews",
        "lesserprocess",
        "latebuttocks",
        "lakesdusky",
        "entirelycircle",
        "sortlapis",
        "ollieimprove",
        "barbarouspullover",
        "vivaciousjournal",
        "courtfit",
        "printelection",
        "tireluxurious",
        "disabilityaction",
        "hummuslifejacket",
        "elegantshotput",
        "namibianhumor",
        "phonylate",
        "moanannounce",
        "nestpalate",
        "felthotsprings",
        "bushabroad",
        "sendharass",
        "scrolltrousers",
        "squealingstack",
        "croquetabsorbing",
        "kingsamosa",
    ]


    demo = User(username='Demo', email='demo@aa.io',
                password='password')

    db.session.add(demo)

    db.session.commit()

    result = []
    for name in user_names:
        result.append(
            User(username=name,
                 email=fake.company_email(),
                 hashed_password='password',
                 first_name=fake.first_name(),
                 last_name=fake.last_name()
                )
        )
    for user in result:
        db.session.add(user)
        db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
