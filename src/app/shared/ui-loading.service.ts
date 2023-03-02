import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UiLoadingService {
  isLoading = new Subject<boolean>();

  changeLoadingState(value: boolean) {
    this.isLoading.next(value);
  }
}
