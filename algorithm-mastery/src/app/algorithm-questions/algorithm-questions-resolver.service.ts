import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

import * as AlgorithmQuestionsAction from './store/algorithm-questions.actions';
import { AppState } from '../store/app.reducer';
import { AllQuestionsResponse } from './store/algorithm-questions.actions';

@Injectable({ providedIn: 'root' })
export class AlgorithmQuestionsResolverService
  implements Resolve<AllQuestionsResponse> {
  constructor(private store: Store<AppState>, private actions: Actions) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<AllQuestionsResponse>
    | Promise<AllQuestionsResponse>
    | AllQuestionsResponse {
    return this.store.select('algorithmQuestions').pipe(
      take(1),
      switchMap((questionsState) /* type AlgorithmQuestionsState */ => {
        if (Object.keys(questionsState.algorithmQuestions).length === 0) {
          this.store.dispatch(AlgorithmQuestionsAction.fetchQuestions());
          return this.actions.pipe(
            ofType(AlgorithmQuestionsAction.setQuestions),
            take(1),
            map((props) /* type: {'question': AllQuestionsResponse} */ => {
              return props.questions;
            })
          );
        }
        return of(questionsState.algorithmQuestions);
      })
    );
  }
}
