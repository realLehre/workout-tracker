import { createAction, props } from '@ngrx/store';
import { Exercise } from '../exercise.model';

export const getAvailableExercises = createAction(
  '[Training] fetch available exercises'
);

export const loadAvailableExercises = createAction(
  '[Training] fetch available exercises',
  props<{ exercises: Exercise[] }>()
);

export const getFinshedExercises = createAction(
  '[Training] get finished exercises',
  props<{ exercises: Exercise[] }>()
);

export const getCurrentExercise = createAction(
  '[Training] get current exercises',
  props<{ id: string }>()
);

export const startTraining = createAction('[Training] start training');

export const stopTraining = createAction('[Training] stop training');
