import { ApiResponse } from '../../shared/models/api-response';

export interface MainCategoriesResponse extends ApiResponse {
  data: {
    items: categoryItem[];
  };
  totalCount: number;
}

export interface categoryItem {
  id: number;
  title: string;
}
