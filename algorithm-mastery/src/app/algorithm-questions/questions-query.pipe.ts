import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';

import { AppState } from '../store/app.reducer';

@Pipe({ name: 'query' })
export class QuestionsQueryPipe implements PipeTransform {
  constructor(private store: Store<AppState>) {}

  transform(questions: string[]): any {
    return this.store.select('algorithmQuestions').pipe(
      take(1),
      map(state => {
        const queriedIds = [];
        for (const id in state.questions) {
          if (state.questions.hasOwnProperty(id)) {
            const qn = state.questions[id];
            const hasTopic =
              state.query.topic !== ''
                ? qn.topic.toLowerCase() === state.query.topic
                : true;
            const hasTechniques =
              state.query.techniques !== []
                ? state.query.techniques.every(queriedTechnique =>
                    qn.techniques.includes(queriedTechnique)
                  )
                : true;
            const queryText = state.query.text.toLowerCase();
            const includesText =
              qn.title.toLowerCase().includes(queryText) ||
              qn.input.toLowerCase().includes(queryText) ||
              qn.output.toLowerCase().includes(queryText) ||
              qn.note.toLowerCase().includes(queryText);
            if (hasTopic && hasTechniques && includesText) {
              queriedIds.push(id);
            }
          }
        }
        return queriedIds;
      })
    );
  }
}
