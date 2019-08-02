import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { combineLatest, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import {
  AllQuestionsResponse,
  FilterResponse,
} from './algorithm-questions.actions';
import * as AlgorithmQuestionsAction from './algorithm-questions.actions';

@Injectable()
export class AlgorithmQuestionsEffects {
  constructor(private actions: Actions, private http: HttpClient) {}

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

  fetchFilters = createEffect(() => {
    return this.actions.pipe(
      ofType(AlgorithmQuestionsAction.fetchFilters),
      switchMap(action => {
        return this.http.get<FilterResponse>(environment.filtersEP);
      }),
      map(resp => {
        return AlgorithmQuestionsAction.setFilters({ filters: resp });
      })
    );
  });
}
