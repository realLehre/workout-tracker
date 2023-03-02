import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { BehaviorSubject, map, Subject, Subscription } from 'rxjs';
import { Exercise } from './exercise.model';

@Injectable({ providedIn: 'root' })
export class ExerciseService {
  // getRunningExercise = new Subject<Exercise>();

  availableExercises: Exercise[] = [];

  getAvailableExercisesChanged = new Subject<Exercise[]>();

  getRunningExercise = new BehaviorSubject<Exercise>({
    id: '',
    name: '',
    duration: 0,
    calories: 0,
  });

  runningExercise: Exercise = {
    id: '',
    name: '',
    duration: 0,
    calories: 0,
  };

  completedExercises: Exercise[] = [];
  getFinishedExercises = new Subject<Exercise[]>();

  fbSubs: Subscription[] = [];

  constructor(private db: AngularFirestore) {}

  fetchAvailableExercises() {
    this.fbSubs.push(
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
          this.getAvailableExercisesChanged.next(newData);
        })
    );
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
    this.addFinishedExerciseToDatabase({
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
    this.addFinishedExerciseToDatabase({
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

  fetchCancelledOrCompletedExercises() {
    this.fbSubs.push(
      this.db
        .collection('finishedExercises')
        .valueChanges()
        .subscribe((exercises: any) => {
          this.getFinishedExercises.next(exercises);
        })
    );
  }

  clearWorkoutHistory() {
    this.db
      .collection('finishedExercises')
      .snapshotChanges()
      .pipe(
        map((data: any) => {
          return data.map((item: any) => {
            return item.payload.doc.id;
          });
        })
      )
      .subscribe((data) => {
        data.forEach((item: any) => {
          this.db.collection('finishedExercises').doc(item).delete();
        });
      });
  }

  private addFinishedExerciseToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }
}
