import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Exercise } from './exercise.model';

@Injectable({ providedIn: 'root' })
export class ExerciseService {
  // getRunningExercise = new Subject<Exercise>();
  getRunningExercise = new BehaviorSubject<Exercise>({
    id: '',
    name: '',
    duration: 0,
    calories: 0,
  });

  availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 60, calories: 10 },
    { id: 'burpees', name: 'Burpees', duration: 120, calories: 25 },
    { id: 'jumping-jacks', name: 'Jumping jacks', duration: 200, calories: 40 },
    { id: 'push-ups', name: 'Push ups', duration: 120, calories: 25 },
  ];

  runningExercise: Exercise = {
    id: '',
    name: '',
    duration: 0,
    calories: 0,
  };

  completedExercises: Exercise[] = [];

  getCurrentExercise(id: string) {
    this.availableExercises.find((exercise) => {
      if (exercise.id == id) {
        this.getRunningExercise.next({ ...exercise });
        this.runningExercise = exercise;
      }
    });
  }

  returnCurrentExercise() {
    return this.runningExercise;
  }

  completeExercise() {
    this.completedExercises.push({
      ...this.runningExercise,
      state: 'completed',
      date: new Date(),
    });
    this.getRunningExercise.next({
      id: '',
      name: '',
      duration: 0,
      calories: 0,
    });
  }

  cancelExercise(progress: number) {
    this.completedExercises.push({
      ...this.runningExercise,
      state: 'cancelled',
      date: new Date(),
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
    });
    this.getRunningExercise.next({
      id: '',
      name: '',
      duration: 0,
      calories: 0,
    });
  }

  getCancelledOrCompletedExercises() {
    return this.completedExercises;
  }
}
