import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import * as AlgorithmQuestionsAction from './store/algorithm-questions.actions';
import { AppState } from '../store/app.reducer';
import { FilterResponse } from './store/algorithm-questions.actions';

@Injectable({ providedIn: 'root' })
export class FiltersResolverService implements Resolve<FilterResponse> {
  constructor(private store: Store<AppState>, private actions: Actions) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<FilterResponse> | Promise<FilterResponse> | FilterResponse {
    this.store.dispatch(AlgorithmQuestionsAction.fetchFilters());
    return this.actions.pipe(
      ofType(AlgorithmQuestionsAction.setFilters),
      take(1),
      map((props: { filters: FilterResponse }) => {
        return props.filters;
      })
    );
  }
}
