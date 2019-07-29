import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';

import { AlgorithmQuestionEditComponent } from '../algorithm-question-list/algorithm-question-edit/algorithm-question-edit.component';
import { getEmptyQuestion } from '../algorithm-question-list/algorithm-question.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private isAuthenticated: boolean;
  private sub: Subscription;

  constructor(private dialog: MatDialog) {}

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
      }
    });
  }
}
