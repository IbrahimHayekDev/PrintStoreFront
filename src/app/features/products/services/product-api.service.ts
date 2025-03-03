import { Injectable } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import { Observable } from 'rxjs';
import { ProductListingResponse } from '../models/ProductListingResponse';
import { CustomizeProductListingResponse } from '../models/CustomizeProductListingResponse';
import { CustomizeProductDetailsResponse } from '../models/CustomizeProductDetailsResponse';
import { ProductSizeGuideResponse } from '../models/ProductSizeGuideResponse';

@Injectable({
  providedIn: 'root',
})
export class ProductapiService {
  constructor(private apiService: ApiService) {}

  GetStoreProductsByCategortyId(
    categoryID: number
  ): Observable<ProductListingResponse> {
    return this.apiService.getData(
      `Product/GetStoreProductsByCatId?categoryId=${categoryID}`
    );
  }

  GetCustomieProductsByCategortyId(
    categoryID: number
  ): Observable<CustomizeProductListingResponse> {
    return this.apiService.getData(
      `Product/GetCustomizeProductsByCategortyId?categoryId=${categoryID}`
    );
  }

  GetCustomizeProducDetailstbyId(
    productId: number
  ): Observable<CustomizeProductDetailsResponse> {
    return this.apiService.getData(
      `Product/GetCustomizeProducDetailstbyId?id=${productId}`
    );
  }

  GetProductSizeGuideByProductId(
    productId: number
  ): Observable<ProductSizeGuideResponse> {
    return this.apiService.getData(
      `PrintfulSync/ProductSizeGuideByProductId?pId=${productId}`
    );
  }
}
