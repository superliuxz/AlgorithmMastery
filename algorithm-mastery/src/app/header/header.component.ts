import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  private dialogSub: Subscription;
  private filtersSub: Subscription;
  private searchSub: Subscription;
  private topics: string[];
  private techniques: string[];
  private searchText = new FormControl('');
  private selectedTopic = new FormControl('');
  private selectedTechniques = new FormControl([]);

  constructor(private dialog: MatDialog, private store: Store<AppState>) {}

  ngOnInit() {
    this.isAuthenticated = true;

    this.filtersSub = this.store
      .select('algorithmQuestions')
      .subscribe(state => {
        this.topics = state.filters.topics;
        this.techniques = state.filters.techniques;
      });

    const fg = new FormGroup({
      searchText: this.searchText,
      selectedTechniques: this.selectedTechniques,
      selectedTopic: this.selectedTopic,
    });

    this.searchSub = fg.valueChanges.subscribe(values => {
      this.store.dispatch(
        AlgorithmQuestionsAction.setQuery({
          techniques: values.selectedTechniques,
          text: values.searchText,
          topic: values.selectedTopic,
        })
      );
    });
  }

  ngOnDestroy(): void {
    if (this.dialogSub) {
      this.dialogSub.unsubscribe();
    }
    this.filtersSub.unsubscribe();
    this.searchSub.unsubscribe();
  }

  onNewQuestion(): void {
    const dialogRef = this.dialog.open(AlgorithmQuestionEditComponent, {
      data: getEmptyQuestion(),
      maxWidth: '100vw',
      minWidth: '60vw',
    });
    this.dialogSub = dialogRef.afterClosed().subscribe(updatedQuestion => {
      if (updatedQuestion) {
        this.store.dispatch(
          AlgorithmQuestionsAction.addQuestion({
            question: updatedQuestion,
          })
        );
      }
    });
  }
}
