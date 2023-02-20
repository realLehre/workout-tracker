import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ExerciseService } from './exercise.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TrainingComponent implements OnInit {
  training: boolean = false;

  constructor(private exerciseService: ExerciseService) {}

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
  }
}
