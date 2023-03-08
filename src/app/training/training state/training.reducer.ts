import { createReducer, on } from '@ngrx/store';

import { Exercise } from '../exercise.model';
import * as fromApp from '../../state management/app.reducer';
import * as fromTrainingActions from './training.actions';
import { Action } from 'rxjs/internal/scheduler/Action';

export interface TrainingState {
  availableExercises: Exercise[];
  finishedExercises: Exercise[];
  activeTraining: Exercise | null;
  isTraining: boolean;
}

export interface State extends fromApp.AppState {
  training: TrainingState;
}

const initialTrainingState: TrainingState = {
  availableExercises: [],
  finishedExercises: [],
  activeTraining: null,
  isTraining: false,
};

export const trainingReducer = createReducer(
  initialTrainingState,

  on(fromTrainingActions.startTraining, (state) => {
    return {
      ...state,
      isTraining: true,
    };
  }),

  on(fromTrainingActions.stopTraining, (state) => {
    return {
      ...state,
      isTraining: false,
    };
  }),

  on(fromTrainingActions.loadAvailableExercises, (state, action) => {
    return {
      ...state,
      availableExercises: action.exercises,
    };
  }),

  on(fromTrainingActions.getFinshedExercises, (state, action) => {
    return {
      ...state,
      finishedExercises: action.exercises,
    };
  }),

  on(fromTrainingActions.getCurrentExercise, (state, action) => {
    return {
      ...state,
      activeTraining: {
        ...state.availableExercises.find(
          (exercise) => exercise.id == action.id
        ),
      },
    };
  })
);
