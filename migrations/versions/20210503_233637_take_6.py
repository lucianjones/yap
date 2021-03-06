"""take 6

Revision ID: c0523ade31f4
Revises: 4396137ede68
Create Date: 2021-05-03 23:36:37.129269

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c0523ade31f4'
down_revision = '4396137ede68'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('friends_table',
    sa.Column('user_id_1', sa.Integer(), nullable=True),
    sa.Column('user_id_2', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id_1'], ['users.id'], ),
    sa.ForeignKeyConstraint(['user_id_2'], ['users.id'], )
    )
    op.drop_table('friends')
    op.add_column('recipients', sa.Column('private_message_id', sa.Integer(), nullable=False))
    op.create_foreign_key(None, 'recipients', 'private_messages', ['private_message_id'], ['id'], ondelete='CASCADE')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'recipients', type_='foreignkey')
    op.drop_column('recipients', 'private_message_id')
    op.create_table('friends',
    sa.Column('user_id_1', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('user_id_2', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.ForeignKeyConstraint(['user_id_1'], ['users.id'], name='friends_user_id_1_fkey'),
    sa.ForeignKeyConstraint(['user_id_2'], ['users.id'], name='friends_user_id_2_fkey')
    )
    op.drop_table('friends_table')
    # ### end Alembic commands ###
