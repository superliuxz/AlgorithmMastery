import logging

from django.http import HttpResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import View

logger = logging.getLogger("django")


@method_decorator(csrf_exempt, name="dispatch")
class Update(View):

  http_method_names = ["post"]

  def post(self, request, *args, **kwargs):
    return HttpResponse(status=201)


@method_decorator(csrf_exempt, name="dispatch")
class Retrieve(View):

  http_method_names = ["get"]

  def get(self, request, *args, **kwargs):
    return HttpResponse(status=200)