import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../shared/services/api.service';
import { AllCategoriesResponse } from '../models/api-response/AllCategoriesResponse';

@Injectable({
  providedIn: 'root',
})
export class CategoryApiService {
  constructor(private apiService: ApiService) {}

  GetCategoriesWithProducts(): Observable<AllCategoriesResponse> {
    return this.apiService.getData('Category/GetCategoriesWithProducts');
  }

  GetPortalCategoriesById(
    categoryId: number
  ): Observable<AllCategoriesResponse> {
    return this.apiService.getData(
      `Category/GetPortalCategoriesById?categoryId=${categoryId}`
    );
  }

  GetCategoriesWithCustomizableProducts(): Observable<AllCategoriesResponse> {
    return this.apiService.getData(
      'Category/GetCategoriesWithCustomizableProducts'
    );
  }
}
