"""take 11

Revision ID: 635d8acfe767
Revises: 7c37b7e37ab2
Create Date: 2021-05-04 16:40:36.927356

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '635d8acfe767'
down_revision = '7c37b7e37ab2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('server_members',
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('server_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['server_id'], ['servers.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], )
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('server_members')
    # ### end Alembic commands ###