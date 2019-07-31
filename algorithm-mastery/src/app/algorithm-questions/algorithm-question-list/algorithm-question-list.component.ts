import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AppState } from '../../store/app.reducer';

@Component({
  selector: 'app-algorithm-question-list',
  templateUrl: './algorithm-question-list.component.html',
  styleUrls: ['./algorithm-question-list.component.css'],
})
export class AlgorithmQuestionListComponent implements OnInit, OnDestroy {
  questionIds: string[] = [];
  private sub: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.sub = this.store.select('algorithmQuestions').subscribe(state => {
      const ids = [];
      for (const id in state.algorithmQuestions) {
        if (state.algorithmQuestions.hasOwnProperty(id)) {
          ids.push(id);
        }
      }
      this.questionIds = ids;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
