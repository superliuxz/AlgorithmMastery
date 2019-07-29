from functools import wraps
from typing import Callable

from django.urls import resolve
from django.http import HttpResponse, HttpRequest
from algo_mastery.models import BearerToken


class BearerTokenChecker:
  def __init__(self, get_response: Callable = None):
    self.get_response = get_response

  def __call__(self, request: HttpRequest, *args, **kwargs):
    if getattr(resolve(request.path)[0], 'bearer_token_exempt', False):
      return self.get_response(request)

    authorization_data = request.META.get('HTTP_AUTHORIZATION')

    if not authorization_data:
      return HttpResponse('Unauthorized', status=401)

    authorization_parts = authorization_data.split(" ")

    if len(authorization_parts) != 2:
      return HttpResponse('Unauthorized', status=401)

    if authorization_parts[0].lower() != 'bearer':
      return HttpResponse('Unauthorized', status=401)

    if BearerToken.objects.filter(data=authorization_parts[1]).count() < 1:
      return HttpResponse('Unauthorized', status=401)

    return self.get_response(request)


def bearer_token_exempt(view_func: Callable):
  def wrapped_view(*args, **kwargs):
    return view_func(*args, **kwargs)
  wrapped_view.bearer_token_exempt = True
  return wraps(view_func)(wrapped_view)
