import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatExpansionPanel } from '@angular/material';
import { Subscription } from 'rxjs';
import { Converter } from 'showdown';

import { AlgorithmQuestionEditComponent } from '../algorithm-question-edit/algorithm-question-edit.component';
import { AlgorithmQuestionModel } from '../algorithm-question.model';

@Component({
  selector: 'app-algorithm-question-item',
  templateUrl: './algorithm-question-item.component.html',
  styleUrls: ['./algorithm-question-item.component.css'],
  viewProviders: [MatExpansionPanel],
})
export class AlgorithmQuestionItemComponent implements OnInit, OnDestroy {
  @Input() algorithmQuestion: AlgorithmQuestionModel;
  private sub: Subscription;
  converter = new Converter();

  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  onEdit(): void {
    const dialogRef = this.dialog.open(AlgorithmQuestionEditComponent, {
      data: this.algorithmQuestion,
      maxWidth: '100vw',
      minWidth: '60vw',
    });
    this.sub = dialogRef.afterClosed().subscribe(updatedQuestion => {
      if (updatedQuestion) {
        console.log(updatedQuestion);
        this.algorithmQuestion = updatedQuestion;
      }
    });
  }
}
