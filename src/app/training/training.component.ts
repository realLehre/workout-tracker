import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';

import { ExerciseService } from './exercise.service';
import * as fromTraining from '../training/training state/training.reducer';
import * as fromTrainingActions from '../training/training state/training.actions';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TrainingComponent implements OnInit {
  training: boolean = false;

  constructor(
    private exerciseService: ExerciseService,
    private store: Store<fromTraining.State>
  ) {}

  ngOnInit(): void {
    this.exerciseService.getRunningExercise.subscribe({
      next: (exercise) => {
        if (exercise.name) {
          this.training = true;
        } else {
          this.training = false;
        }
      },
    });

    this.store.dispatch(fromTrainingActions.getAvailableExercises());
  }
}
