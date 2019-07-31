import { Action, createReducer, on } from '@ngrx/store';

import * as AlgorithmQuestionsAction from './algorithm-questions.actions';
import { AlgorithmQuestionModel } from '../algorithm-question.model';

export interface AlgorithmQuestionsState {
  algorithmQuestions: {
    [id: string]: AlgorithmQuestionModel;
  };
}

const initialState: AlgorithmQuestionsState = { algorithmQuestions: {} };

export function algorithmQuestionsReducer(
  algorithmQuestionsState: AlgorithmQuestionsState | undefined,
  algorithmQuestionsAction: Action
) {
  return createReducer(
    initialState,
    on(AlgorithmQuestionsAction.setQuestions, (state, action) => {
      return {
        ...state,
        algorithmQuestions: action.questions,
      };
    }),
    on(AlgorithmQuestionsAction.updateQuestion, (state, action) => {
      const newState = { ...state };
      newState.algorithmQuestions[action.id] = action.question;
      return newState;
    }),
    on(AlgorithmQuestionsAction.setNewQuestionId, (state, action) => {
      const newState = { ...state };
      newState.algorithmQuestions[action.id] = action.question;
      return newState;
    })
  )(algorithmQuestionsState, algorithmQuestionsAction);
}
