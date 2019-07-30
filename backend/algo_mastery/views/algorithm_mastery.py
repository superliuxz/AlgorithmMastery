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
    return JsonResponse(
      {
        '3bfcd158-6801-4a02-9eaf-a1fbb083d97d': {
          'title': 'Maximum Width Ramp',
          'source': 'https://leetcode.com/problems/maximum-width-ramp/',
          'topic': 'Array',
          'tags': [],
          'techniques': ['Binary search'],
          'input':
            'Given an array A of integers, a ramp is a tuple (i, j) for which '
            'i < j and A[i] <= A[j]. The width of such a ramp is j - i.',
          'output':
            "Find the maximum width of a ramp in A.  If one doesn't exist, "
            "return 0.",
          'solution':
            'Traverse the array while keep a list of decreasing heights and '
            'their corresponding indexes. Update the maximum width as '
            'traversing.',
          'spaceComplexity': 'O(NlogN)',
          'timeComplexity': 'O(N)',
          'note': '',
        },
        '75d2dd7c-b55b-4b81-8d14-cac8b684b192': {
          'title': 'Best Time to Buy and Sell Stock',
          'source': 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/',
          'topic': 'Array',
          'tags': [],
          'techniques': ['DP', 'Greedy'],
          'input': 'arr = [7,1,5,3,6,4]',
          'output': '5 because buy on day 2 and sell on day 5',
          'solution':
            'Loop through everything and maintain a min_profit and repeatedly '
            'update max_profit.',
          'spaceComplexity': 'O(n)',
          'timeComplexity': 'O(1)',
          'note': '',
        }
      },
      status=200)

  def post(self, request, *args, **kwargs):
    return HttpResponse(status=201)
