import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Exercise } from '../exercise.model';
import { ExerciseService } from '../exercise.service';
import * as fromTraining from '../training state/training.reducer';
import * as fromTrainingActions from '../training state/training.actions';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss'],
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[] = [];
  isLoading: boolean = false;
  exercisesSub!: Subscription;

  constructor(
    private exerciseService: ExerciseService,
    private store: Store<fromTraining.State>
  ) {}

  ngOnInit(): void {
    this.isLoading = true;

    // this.exerciseService.fetchAvailableExercises();

    // this.exerciseService.getAvailableExercisesChanged.subscribe((data) => {
    //   this.exercises = data;
    //   this.isLoading = false;
    // });

    this.exercisesSub = this.store.select('training').subscribe((data) => {
      this.exercises = data.availableExercises;

      if (data.availableExercises) {
        this.isLoading = false;
      }
    });
  }

  setOnGoingTraining(form: NgForm) {
    this.exerciseService.getCurrentExercise(form.value.exerciseSelected);

    this.store.dispatch(
      fromTrainingActions.getCurrentExercise(form.value.exerciseSelected)
    );
  }

  ngOnDestroy(): void {
    this.exercisesSub.unsubscribe();
  }
}
