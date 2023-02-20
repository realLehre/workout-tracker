import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Exercise } from '../exercise.model';
import { ExerciseService } from '../exercise.service';
import { StopTrainingDialog } from './stop-training-dialog.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss'],
})
export class CurrentTrainingComponent implements OnInit {
  trainingDuration: number = 0;
  trainingInterval: any;
  @Output() stopTraining = new EventEmitter<void>();
  training!: Exercise;
  trainingName!: string;

  constructor(
    private dialog: MatDialog,
    private exerciseService: ExerciseService
  ) {}

  ngOnInit(): void {
    this.training = this.exerciseService.returnCurrentExercise();
    this.trainingName = this.training.name;

    this.startOrStopTraining();
  }

  startOrStopTraining() {
    const duration = (this.training.duration / 100) * 1000;

    this.trainingInterval = setInterval(() => {
      if (this.trainingDuration >= 100) {
        this.exerciseService.completeExercise();
        return;
      }
      this.trainingDuration += 5;
    }, duration);
  }

  cancelTraining() {
    clearInterval(this.trainingInterval);

    const dialogRef = this.dialog.open(StopTrainingDialog, {
      data: { percentage: this.trainingDuration },
      width: '300px',
    });

    dialogRef.afterClosed().subscribe({
      next: (value) => {
        if (value) {
          this.exerciseService.cancelExercise(this.trainingDuration);
        } else {
          this.startOrStopTraining();
        }
      },
    });
  }
}
