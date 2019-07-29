from django.core.management.base import BaseCommand, CommandError
from django.db import transaction

from algo_mastery.models import BearerToken


class Command(BaseCommand):

  def add_arguments(self, parser):
    parser.add_argument('command', type=str, help=
    '''
    Specify the type of command. Options are:
    create: create a new bearer token and delete the previous token.
    list: list the current bearer token.
    ''')

  @transaction.atomic
  def handle(self, *args, **options):
    command_type = options.get('command')
    if not command_type:
      raise CommandError('Command argument is required')
    elif command_type == 'create':
      self._create_token()
    elif command_type == 'list':
      self._list_tokens()
    else:
      raise CommandError('Invalid command "{type}"'.format(type=command_type))

  def _create_token(self):
    BearerToken.objects.filter().delete()
    key = BearerToken.objects.create()

    self.stdout.write(
      self.style.SUCCESS(
        'Created bear token: "{tok}"'.format(tok=key.data)
      )
    )

  def _list_tokens(self):
    tokens = BearerToken.objects.filter()
    if len(tokens) == 0:
      self.stdout.write(self.style.SUCCESS('None'))

    for tok in tokens:
      self.stdout.write(self.style.SUCCESS('{tok}'.format(tok=tok.data)))
