from django.db import models

from uuid import uuid4


class BearerToken(models.Model):
    data = models.TextField(default=uuid4)
