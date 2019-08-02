import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AlgorithmQuestionListComponent } from './algorithm-questions/algorithm-question-list/algorithm-question-list.component';
import { AlgorithmQuestionsResolverService } from './algorithm-questions/algorithm-questions-resolver.service';
import { FiltersResolverService } from './algorithm-questions/filters-resolver.service';

const appRoutes: Routes = [
  {
    path: 'questions',
    component: AlgorithmQuestionListComponent,
    resolve: [FiltersResolverService, AlgorithmQuestionsResolverService],
  },
  { path: '**', redirectTo: '/questions' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
