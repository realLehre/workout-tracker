import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Exercise } from '../exercise.model';
import { ExerciseService } from '../exercise.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss'],
})
export class NewTrainingComponent implements OnInit {
  exercises: Exercise[] = [];
  exercisesSub!: Observable<any>;

  constructor(
    private exerciseService: ExerciseService,
    private db: AngularFirestore
  ) {}

  ngOnInit(): void {
    // this.exercises = this.exerciseService.availableExercises;
    this.exercisesSub = this.db.collection('AvailableExercises').valueChanges();
    this.exerciseService.fetchAvailableExercises();
  }

  setOnGoingTraining(form: NgForm) {
    this.exerciseService.getCurrentExercise(form.value.exerciseSelected);
  }
}
