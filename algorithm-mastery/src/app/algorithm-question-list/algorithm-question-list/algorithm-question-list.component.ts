import { Component, OnInit } from '@angular/core';

import { AlgorithmQuestionModel } from '../algorithm-question.model';

@Component({
  selector: 'app-algorithm-question-list',
  templateUrl: './algorithm-question-list.component.html',
  styleUrls: ['./algorithm-question-list.component.css'],
})
export class AlgorithmQuestionListComponent implements OnInit {
  questions: AlgorithmQuestionModel[] = [
    {
      title: 'Maximum Width Ramp',
      source: 'https://leetcode.com/problems/maximum-width-ramp/',
      topic: 'Array',
      tags: [],
      techniques: ['Binary search'],
      input:
        'Given an array A of integers, a ramp is a tuple (i, j) for which i < j and A[i] <= A[j]. ' +
        'The width of such a ramp is j - i.',
      output:
        "Find the maximum width of a ramp in A.  If one doesn't exist, return 0.",
      solution:
        'Traverse the array while keep a list of decreasing heights and their corresponding indexes. ' +
        'Update the maximum width as traversing.',
      spaceComplexity: 'O(NlogN)',
      timeComplexity: 'O(N)',
      note: '',
    },
    {
      title: 'Best Time to Buy and Sell Stock',
      source: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/',
      topic: 'Array',
      tags: [],
      techniques: ['DP', 'Greedy'],
      input: 'arr = [7,1,5,3,6,4]',
      output: '5 because buy on day 2 and sell on day 5',
      solution:
        'Loop through everything and maintain a min_profit and repeatedly update max_profit.',
      spaceComplexity: 'O(n)',
      timeComplexity: 'O(1)',
      note: '',
    },
  ];

  constructor() {}

  ngOnInit() {}
}
