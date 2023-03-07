import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromUi from '../shared/ui.reducer';

export interface AppState {
  ui: fromUi.UiState;
}

export const reducers: ActionReducerMap<AppState> = {
  ui: fromUi.uiReducer,
};

export const getUiState = createFeatureSelector<fromUi.UiState>('ui');
