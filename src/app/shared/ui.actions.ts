import { createAction } from '@ngrx/store';

export const startLoading = createAction('[UI] start loading');

export const stopLoading = createAction('[UI] stop loading');
