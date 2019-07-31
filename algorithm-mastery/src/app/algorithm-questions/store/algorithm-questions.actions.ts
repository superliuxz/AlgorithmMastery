import { createAction, props } from '@ngrx/store';

import { AlgorithmQuestionModel } from '../algorithm-question.model';

export interface AllQuestionsResponse {
  [id: string]: AlgorithmQuestionModel;
}

const prefix = '[Algorithm Question]';

// Add one question to the backend.
export const addQuestion = createAction(
  `${prefix} Add Question`,
  props<{ question: AlgorithmQuestionModel }>()
);

//
export const setNewQuestionId = createAction(
  `${prefix} Set Question ID`,
  props<{ id: string; question: AlgorithmQuestionModel }>()
);

// Update one question to the backend.
export const updateQuestion = createAction(
  `${prefix} Update Question`,
  props<{ id: string; question: AlgorithmQuestionModel }>()
);

// Fetch all questions from the backend.
export const fetchQuestions = createAction(`${prefix} Fetch Questions`);

// Set all questions to store.
export const setQuestions = createAction(
  `${prefix} Set Questions`,
  props<{ questions: AllQuestionsResponse }>()
);
