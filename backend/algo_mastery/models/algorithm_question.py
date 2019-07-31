from django.db import models
from django.contrib.postgres.fields import ArrayField


class AlgorithmQuestion(models.Model):
  id = models.CharField(max_length=36, primary_key=True)
  title = models.TextField(default='')
  source = models.TextField(default='')
  topic = models.TextField(default='')
  tags = ArrayField(models.TextField(default=''))
  techniques = ArrayField(models.TextField(default=''))
  input = models.TextField(default='')
  output = models.TextField(default='')
  solution = models.TextField(default='')
  spaceComplexity = models.TextField(default='')
  timeComplexity = models.TextField(default='')
  note = models.TextField(default='')
