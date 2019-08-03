import json
import logging
from uuid import uuid4

from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import View

from algo_mastery.models import AlgorithmQuestion
from algo_mastery.middleware import bearer_token_exempt

logger = logging.getLogger('django')


@method_decorator(bearer_token_exempt, name='dispatch')
@method_decorator(csrf_exempt, name='dispatch')
class OneQuestion(View):
  http_method_names = ['put', 'post']

  # Add new question.
  def put(self, request, *args, **kwargs):
    if not request.body:
      return JsonResponse({'message': 'missing request body.'}, status=400)
    try:
      body = json.loads(request.body.decode('utf-8'))
    except json.JSONDecodeError:
      return JsonResponse({'message': 'bad request body.'}, status=400)
    question_id = str(uuid4())
    while AlgorithmQuestion.objects.filter(id=question_id).count() != 0:
      question_id = str(uuid4())
    AlgorithmQuestion.objects.create(
      id=question_id,
      title=body.get('title'),
      source=body.get('source'),
      topic=body.get('topic'),
      tags=body.get('tags'),
      techniques=body.get('techniques'),
      input=body.get('input'),
      output=body.get('output'),
      solution=body.get('solution'),
      spaceComplexity=body.get('spaceComplexity'),
      timeComplexity=body.get('timeComplexity'),
      note=body.get('note')
    )
    return JsonResponse({'created': f'{question_id}'}, status=200)

  # Update existing question.
  def post(self, request, question_id, *args, **kwargs):
    if not request.body:
      return JsonResponse({'message': 'missing request body.'}, status=400)
    try:
      body = json.loads(request.body.decode('utf-8'))
    except json.JSONDecodeError:
      return JsonResponse({'message': 'bad request body.'}, status=400)
    if AlgorithmQuestion.objects.filter(id=question_id).count() != 1:
      return JsonResponse({'message': f'{question_id} does not exist!'},
                          status=400)
    AlgorithmQuestion.objects.filter(id=question_id).update(
      title=body.get('title'),
      source=body.get('source'),
      topic=body.get('topic'),
      tags=body.get('tags'),
      techniques=body.get('techniques'),
      input=body.get('input'),
      output=body.get('output'),
      solution=body.get('solution'),
      spaceComplexity=body.get('spaceComplexity'),
      timeComplexity=body.get('timeComplexity'),
      note=body.get('note')
    )
    return JsonResponse({'message': f'{question_id} updated'}, status=200)


@method_decorator(bearer_token_exempt, name='dispatch')
@method_decorator(csrf_exempt, name="dispatch")
class AllQuestions(View):
  http_method_names = ['get']

  def get(self, request, *args, **kwargs):
    questions = AlgorithmQuestion.objects.all()
    payload = dict()
    for question in questions:
      question_model = dict()
      question_model['title'] = question.title
      question_model['source'] = question.source
      question_model['topic'] = question.topic
      question_model['tags'] = question.tags
      question_model['techniques'] = question.techniques
      question_model['input'] = question.input
      question_model['output'] = question.output
      question_model['solution'] = question.solution
      question_model['spaceComplexity'] = question.spaceComplexity
      question_model['timeComplexity'] = question.timeComplexity
      question_model['note'] = question.note
      payload[question.id] = question_model

    return JsonResponse(payload, status=200)
