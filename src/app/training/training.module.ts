import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { MaterialModule } from '../material.module';
import { EffectsModule, USER_PROVIDED_EFFECTS } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { CurrentTrainingComponent } from './current-training/current-training.component';
import { StopTrainingDialog } from './current-training/stop-training-dialog.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { TrainingComponent } from './training.component';
import { TrainingRoutingModule } from './training.routing.module';
import { TrainingEffects } from './training state/training.effects';
import { trainingReducer } from './training state/training.reducer';

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
    StoreModule.forFeature('training', trainingReducer),
    EffectsModule.forFeature([TrainingEffects]),
  ],
  providers: [
    // TrainingEffects,
    // {
    //   provide: USER_PROVIDED_EFFECTS,
    //   multi: true,
    //   useValue: [TrainingEffects],
    // },
  ],
  entryComponents: [StopTrainingDialog],
})
export class TrainingModule {}
