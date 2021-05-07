from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField
from wtforms.validators import DataRequired


class ChannelForm(FlaskForm):
    server_id = IntegerField("Server Id", validators=[DataRequired()])
    channel_name = StringField("Name", validators=[DataRequired()])
    public = BooleanField("Public", default="checked")
