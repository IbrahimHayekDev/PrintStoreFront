import { ApiResponse } from '../../../shared/models/api-response';
import { StoreProductListingDTO } from '../../../shared/models/StoreProductListingDTO';

export interface ProductListingResponse extends ApiResponse {
  data: {
    items: StoreProductListingDTO[];
  };
  totalCount: number;
}
