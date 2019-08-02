import { Action, createReducer, on } from '@ngrx/store';

import * as AlgorithmQuestionsAction from './algorithm-questions.actions';
import { AlgorithmQuestionModel } from '../algorithm-question.model';

export interface AlgorithmQuestionsState {
  questions: {
    [id: string]: AlgorithmQuestionModel;
  };
  filters: {
    topics: string[];
    techniques: string[];
  };
}

const initialState: AlgorithmQuestionsState = {
  questions: {},
  filters: { topics: [], techniques: [] },
};

export function algorithmQuestionsReducer(
  algorithmQuestionsState: AlgorithmQuestionsState | undefined,
  algorithmQuestionsAction: Action
) {
  return createReducer(
    initialState,
    on(AlgorithmQuestionsAction.setQuestions, (state, action) => {
      return {
        ...state,
        questions: action.questions,
      };
    }),
    on(AlgorithmQuestionsAction.updateQuestion, (state, action) => {
      const newState = { ...state };
      newState.questions[action.id] = action.question;
      return newState;
    }),
    on(AlgorithmQuestionsAction.setNewQuestionId, (state, action) => {
      const newState = { ...state };
      newState.questions[action.id] = action.question;
      return newState;
    }),
    on(AlgorithmQuestionsAction.setFilters, (state, action) => {
      return { ...state, filters: action.filters };
    })
  )(algorithmQuestionsState, algorithmQuestionsAction);
}
