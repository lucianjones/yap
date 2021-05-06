from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired


class ChannelForm(FlaskForm):
    channel_name = StringField("Name", validators=[DataRequired()])
    public = BooleanField("Public", default="checked")
