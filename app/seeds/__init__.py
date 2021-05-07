from flask.cli import AppGroup
from .users import seed_users, undo_users
from .servers import seed_servers, undo_servers
from .channels import seed_channels, undo_channels
from .messages import seed_messages, undo_messages
from .friends import seed_friends, undo_friends
from .private_messages import seed_private_messages, undo_private_messages
from .recipients import seed_recipients, undo_recipients
from .servers_join import seed_server_members, undo_server_members
from .channels_join import seed_channel_members, undo_channel_members

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup("seed")


# Creates the `flask seed all` command
@seed_commands.command("all")
def seed():
    seed_users()
    seed_servers()
    seed_channels()
    seed_friends()
    seed_private_messages()
    seed_recipients()
    seed_server_members()
    seed_channel_members()
    seed_messages()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command("undo")
def undo():
    undo_users()
    undo_servers()
    undo_channels()
    undo_friends()
    undo_private_messages()
    undo_recipients()
    undo_server_members()
    undo_channel_members()
    undo_messages()
    # Add other undo functions here
