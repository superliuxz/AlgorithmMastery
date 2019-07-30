import { createAction, props } from '@ngrx/store';

import { AlgorithmQuestionModel } from '../algorithm-question.model';

export interface AllQuestionsResponse {
  [id: string]: AlgorithmQuestionModel;
}

const prefix = '[Algorithm Question]';

export const addQuestion = createAction(
  `${prefix} Add Question`,
  props<{ question: AlgorithmQuestionModel }>()
);

export const updateQuestion = createAction(
  `${prefix} Update Question`,
  props<{ question: AlgorithmQuestionModel }>()
);

export const fetchQuestions = createAction(
  `${prefix} Fetch Questions`
);

export const setQuestions = createAction(
  `${prefix} Set Questions`,
  props<{questions: AllQuestionsResponse}>()
);
