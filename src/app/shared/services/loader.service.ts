import { computed, Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private isLoading = signal<boolean>(false);
  loading$ = computed(() => this.isLoading());
  show() {
    this.isLoading.set(true);
  }
  hide() {
    this.isLoading.set(false);
  }
}
