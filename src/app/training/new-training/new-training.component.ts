import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';

import { Exercise } from '../exercise.model';
import { ExerciseService } from '../exercise.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss'],
})
export class NewTrainingComponent implements OnInit {
  exercises: Exercise[] = [];
  isLoading: boolean = false;

  constructor(
    private exerciseService: ExerciseService,
    private db: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.exerciseService.fetchAvailableExercises();

    this.exerciseService.getAvailableExercisesChanged.subscribe((data) => {
      this.exercises = data;
      this.isLoading = false;
    });
  }

  setOnGoingTraining(form: NgForm) {
    this.exerciseService.getCurrentExercise(form.value.exerciseSelected);
  }
}
