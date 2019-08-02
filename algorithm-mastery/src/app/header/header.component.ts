import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AlgorithmQuestionEditComponent } from '../algorithm-questions/algorithm-question-edit/algorithm-question-edit.component';
import { getEmptyQuestion } from '../algorithm-questions/algorithm-question.model';
import * as AlgorithmQuestionsAction from '../algorithm-questions/store/algorithm-questions.actions';
import { AppState } from '../store/app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private isAuthenticated: boolean;
  private sub: Subscription;
  toppingList: string[] = [
    'Extra cheese',
    'Mushroom',
    'Onion',
    'Pepperoni',
    'Sausage',
    'Tomato',
  ];

  constructor(private dialog: MatDialog, private store: Store<AppState>) {}

  ngOnInit() {
    this.isAuthenticated = true;
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  onNewQuestion(): void {
    const dialogRef = this.dialog.open(AlgorithmQuestionEditComponent, {
      data: getEmptyQuestion(),
      maxWidth: '100vw',
      minWidth: '60vw',
    });
    this.sub = dialogRef.afterClosed().subscribe(updatedQuestion => {
      if (updatedQuestion) {
        console.log(updatedQuestion);
        this.store.dispatch(
          AlgorithmQuestionsAction.addQuestion({
            question: updatedQuestion,
          })
        );
      }
    });
  }
}
