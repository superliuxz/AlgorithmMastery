import logging

from django.http import HttpResponse, JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import View

logger = logging.getLogger("django")


@method_decorator(csrf_exempt, name="dispatch")
class OneQuestion(View):

  http_method_names = ['get', 'post']

  def get(self, request, question_id, *args, **kwargs):
    return JsonResponse({'question_id': question_id}, status=200)

  def post(self, request, question_id, *args, **kwargs):
    return JsonResponse({'question_id': question_id}, status=201)


@method_decorator(csrf_exempt, name="dispatch")
class AllQuestions(View):

  http_method_names = ['get', 'post']

  def get(self, request, *args, **kwargs):
    return HttpResponse(status=200)

  def post(self, request, *args, **kwargs):
    return HttpResponse(status=201)
