import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../shared/services/api.service';
import {
  categoryItem,
  MainCategoriesResponse,
} from '../models/MainCategoriesResponse';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  constructor(private apiService: ApiService) {}

  GetPortalMainCategories(): Observable<MainCategoriesResponse> {
    return this.apiService.getData(`Category/GetPortalMainCategories`);
  }
}
