import { CustomizeVariantDetailsDTO } from './CustomizeProductVariantDTO';

export interface CustomizeProductDetailsDTO {
  averageFulfilmentTime?: number;
  brand: string;
  categoryId: number;
  currency: string;
  id: number;
  imageUrl: string;
  isDiscontinued: number;
  printfulId: number;
  productType: string;
  productTypeName: string;
  title: string;
  productDescription: string;
  model: string;
  variantCount: number;
  originCountry: string;
  customizableVarints: CustomizeVariantDetailsDTO[];
}
