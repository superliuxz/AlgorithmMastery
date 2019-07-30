import {ActionReducerMap} from '@ngrx/store';
import {algorithmQuestionsReducer, AlgorithmQuestionsState} from '../algorithm-questions/store/algorithm-questions.reducer';

export interface AppState {
  algorithmQuestions: AlgorithmQuestionsState;
}

export const appReducer: ActionReducerMap<AppState> = {
  algorithmQuestions: algorithmQuestionsReducer
};
