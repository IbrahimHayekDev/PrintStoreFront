export interface StoreProductListingDTO {
  id: number;
  printfulId: number;
  baseProductId: number;
  productName: string;
  variantCount: number;
  thumbnailUrl: string;
  isIgnored: number;
  currency: string;
  maxPrice: number;
  minPrice: number;
}
