import logging

from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import View

from algo_mastery.middleware import bearer_token_exempt

logger = logging.getLogger('django')

filters = ['Array',
           'Hash Table',
           'Linked List',
           'Math',
           'String',
           'Two Pointers',
           'Binary Search',
           'Divide and Conquer',
           'DP',
           'Backtracking',
           'Stack',
           'Heap',
           'Queue',
           'Greedy',
           'Sort',
           'Bit',
           'Binary Tree',
           'N-ary Tree',
           'Graph',
           'DFS',
           'BFS',
           'DFS+MEMO',
           'UF',
           'Topological Sort',
           'Trie',
           'Binary Index Tree',
           'Segment Tree',
           'BST',
           'Recursion',
           'Minmax',
           'Reservoir Sampling',
           'Sliding Window',
           'Sweep Line',
           'Probability',
           'Random',
           'Post-order Traversal',
           'In-order Traversal',
           'Pre-order Traversal']


@method_decorator(bearer_token_exempt, name='dispatch')
@method_decorator(csrf_exempt, name="dispatch")
class QuestionFilters(View):
  http_method_names = ['get']

  def get(self, request):
    return JsonResponse(
      {
        'topics': filters,
        'techniques': filters
      }, status=200
    )
