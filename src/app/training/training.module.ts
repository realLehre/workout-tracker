import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { MaterialModule } from '../material.module';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { StopTrainingDialog } from './current-training/stop-training-dialog.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { TrainingComponent } from './training.component';
import { TrainingRoutingModule } from './training.routing.module';

@NgModule({
  declarations: [
    CurrentTrainingComponent,
    PastTrainingsComponent,
    NewTrainingComponent,
    StopTrainingDialog,
    TrainingComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,
    TrainingRoutingModule,
  ],
  entryComponents: [StopTrainingDialog],
})
export class TrainingModule {}
