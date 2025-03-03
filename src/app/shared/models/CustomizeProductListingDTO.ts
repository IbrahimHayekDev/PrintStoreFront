import { CategoryDTO } from './CategoryDTO';

export interface CustomizeProductListingDTO {
  brand: string;
  currency: string;
  id: number;
  imageUrl: string;
  maxPrice: number;
  minPrice: number;
  title: string;
}

export interface CategoryDetailsResponse {
  id: number;
  name: string;
  products: CustomizeProductListingDTO[];
  subCategories: CategoryDTO[];
}

export interface SingleCategoryDetails {
  id: number;
  name: string;
  products: CustomizeProductListingDTO[];
}
