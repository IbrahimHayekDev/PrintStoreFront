import { ApiResponse } from '../../../../shared/models/api-response';
import { CategoryDTO } from '../../../../shared/models/CategoryDTO';

export interface AllCategoriesResponse extends ApiResponse {
  data: {
    items: CategoryDTO[];
  };
  totalCount: number;
}
