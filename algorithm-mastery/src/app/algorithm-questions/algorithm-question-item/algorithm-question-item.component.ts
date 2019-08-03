import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatExpansionPanel } from '@angular/material';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Converter } from 'showdown';

import { AppState } from '../../store/app.reducer';
import * as AlgorithmQuestionsAction from '../store/algorithm-questions.actions';
import { AlgorithmQuestionEditComponent } from '../algorithm-question-edit/algorithm-question-edit.component';
import { AlgorithmQuestionModel } from '../algorithm-question.model';

@Component({
  selector: 'app-algorithm-question-item',
  templateUrl: './algorithm-question-item.component.html',
  styleUrls: ['./algorithm-question-item.component.css'],
  viewProviders: [MatExpansionPanel],
})
export class AlgorithmQuestionItemComponent implements OnInit, OnDestroy {
  algorithmQuestion: AlgorithmQuestionModel;
  @Input() questionId: string;
  private dialogSub: Subscription;
  private idSub: Subscription;
  converter = new Converter();

  constructor(private dialog: MatDialog, private store: Store<AppState>) {}

  ngOnInit() {
    this.idSub = this.store
      .select('algorithmQuestions')
      .subscribe(algorithmQuestionsState => {
        this.algorithmQuestion =
          algorithmQuestionsState.questions[this.questionId];
      });
  }

  ngOnDestroy(): void {
    this.idSub.unsubscribe();
    if (this.dialogSub) {
      this.dialogSub.unsubscribe();
    }
  }

  onEdit(): void {
    const dialogRef = this.dialog.open(AlgorithmQuestionEditComponent, {
      data: this.algorithmQuestion,
      maxWidth: '100vw',
      minWidth: '60vw',
    });
    this.dialogSub = dialogRef.afterClosed().subscribe(updatedQuestion => {
      if (updatedQuestion) {
        this.store.dispatch(
          AlgorithmQuestionsAction.updateQuestion({
            id: this.questionId,
            question: updatedQuestion,
          })
        );
      }
    });
  }
}
