import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {map, switchMap} from 'rxjs/operators';

import {environment} from '../../../environments/environment';
import {AllQuestionsResponse} from './algorithm-questions.actions';
import * as AlgorithmQuestionsAction from './algorithm-questions.actions';
import {AlgorithmQuestionsState} from './algorithm-questions.reducer';


@Injectable()
export class AlgorithmQuestionsEffects {
  constructor(
    private actions: Actions,
    private http: HttpClient,
    private store: Store<AlgorithmQuestionsState>
  ) {}
  fetchAlgorithmQuestions = createEffect(
    () => {
      return this.actions.pipe(
        ofType(AlgorithmQuestionsAction.fetchQuestions),
        switchMap(() => {
          return this.http.get<AllQuestionsResponse>(environment.allQuestionsEP);
        }),
        map(response => {
          return AlgorithmQuestionsAction.setQuestions({questions: response});
        })
      );
    }
  );
}
