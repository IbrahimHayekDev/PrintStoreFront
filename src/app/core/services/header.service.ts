import { computed, inject, Injectable, OnInit, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from './data.service';
import { Page } from '../models/page';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  constructor() {}
  dataService = inject(DataService);

  getMenuPages(): Observable<Page[]> {
    return this.dataService.getMenuPages();
  }

  private activePage = signal<number>(0);
  activePage$ = computed(() => this.activePage());
  setPage(pageId: number) {
    localStorage.setItem('activePage', pageId.toString());
    this.activePage.set(pageId);
  }
}
