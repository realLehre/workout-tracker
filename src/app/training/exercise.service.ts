import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { BehaviorSubject, map, Subject } from 'rxjs';
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

  availableExercises: Exercise[] = [];

  runningExercise: Exercise = {
    id: '',
    name: '',
    duration: 0,
    calories: 0,
  };

  completedExercises: Exercise[] = [];

  constructor(private db: AngularFirestore) {}

  fetchAvailableExercises() {
    this.db
      .collection('AvailableExercises')
      .snapshotChanges()
      .pipe(
        map((data: any) => {
          return data.map((item: any) => {
            return {
              id: item.payload.doc.id,
              name: item.payload.doc.data().name,
              calories: item.payload.doc.data().calories,
              duration: item.payload.doc.data().duration,
            };
          });
        })
      )
      .subscribe((newData: Exercise[]) => {
        this.availableExercises = newData;
      });
  }

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
