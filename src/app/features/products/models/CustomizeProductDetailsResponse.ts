import { ApiResponse } from '../../../shared/models/api-response';
import { CustomizeProductDetailsDTO } from '../../../shared/models/customizable-products/CustomizeProductDetailsDTO';

export interface CustomizeProductDetailsResponse extends ApiResponse {
  data: CustomizeProductDetailsDTO;
}
