import { ApiResponse } from '../../../shared/models/api-response';
import {
  CategoryDetailsResponse,
  CustomizeProductListingDTO,
} from '../../../shared/models/CustomizeProductListingDTO';

export interface CustomizeProductListingResponse extends ApiResponse {
  data: CategoryDetailsResponse;
}
