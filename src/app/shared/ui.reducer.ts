import { createReducer, on } from '@ngrx/store';

import * as fromUiActions from './ui.actions';

export interface UiState {
  isLoading: boolean;
}

const initialLoadingState: UiState = {
  isLoading: false,
};

export const uiReducer = createReducer(
  initialLoadingState,
  on(fromUiActions.startLoading, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(fromUiActions.stopLoading, (state) => {
    return {
      ...state,
      isLoading: false,
    };
  })
);
