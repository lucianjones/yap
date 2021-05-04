"""take 4

Revision ID: 4396137ede68
Revises: 76bc4f366b45
Create Date: 2021-05-03 23:30:38.607773

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4396137ede68'
down_revision = '76bc4f366b45'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('recipients',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.add_column('private_messages', sa.Column('created_at', sa.DateTime(), nullable=False))
    op.add_column('private_messages', sa.Column('updated_at', sa.DateTime(), nullable=False))
    op.add_column('private_messages', sa.Column('user_id', sa.Integer(), nullable=False))
    op.drop_constraint('private_messages_user_id_1_fkey', 'private_messages', type_='foreignkey')
    op.drop_constraint('private_messages_user_id_2_fkey', 'private_messages', type_='foreignkey')
    op.create_foreign_key(None, 'private_messages', 'users', ['user_id'], ['id'], ondelete='CASCADE')
    op.drop_column('private_messages', 'user_id_1')
    op.drop_column('private_messages', 'user_id_2')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('private_messages', sa.Column('user_id_2', sa.INTEGER(), autoincrement=False, nullable=False))
    op.add_column('private_messages', sa.Column('user_id_1', sa.INTEGER(), autoincrement=False, nullable=False))
    op.drop_constraint(None, 'private_messages', type_='foreignkey')
    op.create_foreign_key('private_messages_user_id_2_fkey', 'private_messages', 'users', ['user_id_2'], ['id'], ondelete='CASCADE')
    op.create_foreign_key('private_messages_user_id_1_fkey', 'private_messages', 'users', ['user_id_1'], ['id'], ondelete='CASCADE')
    op.drop_column('private_messages', 'user_id')
    op.drop_column('private_messages', 'updated_at')
    op.drop_column('private_messages', 'created_at')
    op.drop_table('recipients')
    # ### end Alembic commands ###
