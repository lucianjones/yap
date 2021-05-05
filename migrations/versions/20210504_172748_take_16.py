"""take 16

Revision ID: aaf59e1d6463
Revises: 6cb3f12677dd
Create Date: 2021-05-04 17:27:48.910360

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'aaf59e1d6463'
down_revision = '6cb3f12677dd'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('private_messages', sa.Column('recipient_id', sa.Integer(), nullable=False))
    op.create_foreign_key(None, 'private_messages', 'recipients', ['recipient_id'], ['id'], ondelete='CASCADE')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'private_messages', type_='foreignkey')
    op.drop_column('private_messages', 'recipient_id')
    # ### end Alembic commands ###
