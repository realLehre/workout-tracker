import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map } from 'rxjs';

import { Exercise } from '../exercise.model';
import { ExerciseService } from '../exercise.service';
import * as fromTrainingActions from './training.actions';

@Injectable()
export class TrainingEffects {
  fetchAvailableTraining$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromTrainingActions.getAvailableExercises),
      concatMap(() => {
        return this.trainingService.getAvailableTrainings().pipe(
          map((exercises: Exercise[]) =>
            fromTrainingActions.loadAvailableExercises({
              exercises: exercises,
            })
          )
        );
      })
    );
  });
  constructor(
    private actions$: Actions,
    private trainingService: ExerciseService
  ) {}
}
