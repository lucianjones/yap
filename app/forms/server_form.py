from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired


class ServerForm(FlaskForm):
    server_name = StringField("Name", validators=[DataRequired()])
    public = BooleanField("Public", default="checked")
