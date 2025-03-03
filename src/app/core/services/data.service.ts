import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../models/page';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}

  private dataUrl = '/assets/data/menu-pages.json';

  http = inject(HttpClient);

  getMenuPages(): Observable<Page[]> {
    return this.http.get<any>(this.dataUrl);
  }
}
