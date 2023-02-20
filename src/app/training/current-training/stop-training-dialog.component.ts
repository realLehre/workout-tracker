import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-stop-training-dialog',
  template: `<div fxLayout="column" fxLayoutAlign="center center">
    <h1 mat-dialog-title>Are you sure?</h1>
    <h1 mat-dialog-content style="font-size: 20px; font-weight: 400">
      You are {{ data.percentage }}% in
    </h1>
    <mat-dialog-actions>
      <button
        [mat-dialog-close]="true"
        mat-raised-button
        style="margin-right: 10px"
      >
        Yes
      </button>
      <button [mat-dialog-close]="false" mat-raised-button color="accent">
        No
      </button>
    </mat-dialog-actions>
  </div>`,
  styles: ['div{text-align: center;}'],
})
export class StopTrainingDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { percentage: number }) {}
}
