import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { combineLatest, of } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { AllQuestionsResponse } from './algorithm-questions.actions';
import * as AlgorithmQuestionsAction from './algorithm-questions.actions';
import { AlgorithmQuestionsState } from './algorithm-questions.reducer';

@Injectable()
export class AlgorithmQuestionsEffects {
  constructor(
    private actions: Actions,
    private http: HttpClient,
    private store: Store<AlgorithmQuestionsState>
  ) {}

  fetchAlgorithmQuestions = createEffect(() => {
    return this.actions.pipe(
      ofType(AlgorithmQuestionsAction.fetchQuestions),
      switchMap(() => {
        return this.http.get<AllQuestionsResponse>(environment.allQuestionsEP);
      }),
      map(response => {
        return AlgorithmQuestionsAction.setQuestions({ questions: response });
      })
    );
  });

  updateAlgorithmQuestion = createEffect(
    () => {
      return this.actions.pipe(
        ofType(AlgorithmQuestionsAction.updateQuestion),
        switchMap(action => {
          return this.http.post(
            environment.oneQuestionEP + action.id,
            action.question
          );
        })
      );
    },
    { dispatch: false }
  );

  AddAlgorithmQuestion = createEffect(() => {
    return this.actions.pipe(
      ofType(AlgorithmQuestionsAction.addQuestion),
      switchMap(action => {
        return combineLatest(
          this.http.put<{ created: string }>(
            environment.oneQuestionEP,
            action.question
          ),
          of(action)
        );
      }),
      map(([resp, action]) => {
        return AlgorithmQuestionsAction.setNewQuestionId({
          id: resp.created,
          question: action.question,
        });
      })
    );
  });
}
