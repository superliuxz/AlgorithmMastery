from django.http import JsonResponse, HttpRequest
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import View

from algo_mastery.middleware import bearer_token_exempt


@method_decorator(bearer_token_exempt, name='dispatch')
@method_decorator(csrf_exempt, name='dispatch')
class Health(View):

  http_method_names = ['get']

  def get(self, request: HttpRequest, *args, **kwargs):
    return JsonResponse({'success': True}, status=200)
