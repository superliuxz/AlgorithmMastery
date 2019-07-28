import { Component, OnInit } from '@angular/core';
import { AlgorithmQuestionModel } from '../algorithm-question.model';

@Component({
  selector: 'app-search-content',
  templateUrl: './search-content.component.html',
  styleUrls: ['./search-content.component.css'],
})
export class SearchContentComponent implements OnInit {
  questions: AlgorithmQuestionModel[] = [
    new AlgorithmQuestionModel(
      'Maximum Width Ramp',
      'https://leetcode.com/problems/maximum-width-ramp/',
      ['Array'],
      [],
      ['Binary search'],
      'Given an array A of integers, a ramp is a tuple (i, j) for which i < j and A[i] <= A[j].  The width of such a ramp is j - i.',
      "Find the maximum width of a ramp in A.  If one doesn't exist, return 0.",
      'Traverse the array while keep a list of decreasing heights and their corresponding indexes. Update the maximum width as traversing.',
      ['O(NlogN)', 'O(N)'],
      ''
    ),
    new AlgorithmQuestionModel(
      'Best Time to Buy and Sell Stock',
      'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/',
      ['Array'],
      [],
      ['DP', 'Greedy'],
      'arr = [7,1,5,3,6,4]',
      '5 because buy on day 2 and sell on day 5',
      'Loop through everything and maintain a min_profit and repeatedly update max_profit.',
      ['O(n)', 'O(1)'],
      ''
    ),
  ];

  constructor() {}

  ngOnInit() {}
}
