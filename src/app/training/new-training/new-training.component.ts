import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Exercise } from '../exercise.model';
import { ExerciseService } from '../exercise.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss'],
})
export class NewTrainingComponent implements OnInit {
  exercises: Exercise[] = [];

  constructor(private exerciseService: ExerciseService) {}

  ngOnInit(): void {
    this.exercises = this.exerciseService.availableExercises;
  }

  setOnGoingTraining(form: NgForm) {
    this.exerciseService.getCurrentExercise(form.value.exerciseSelected);
  }
}
