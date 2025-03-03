export interface CustomizeVariantDetailsDTO {
  id: number;
  printfulId: number;
  baseProductId: number;
  printfulProductId: number;
  variantName: string;
  color: string;
  colorCode1: string;
  colorCode2: string;
  imageUrl: string;
  price: number;
  size: string;
  inStock: number;
  productMaterials: ProductMaterial[];
  availableRegions: AvailableRegions[];
}

export interface ProductMaterial {
  id: number;
  variantId: number;
  materialName: string;
  materialPercentage: number;
}

export interface AvailableRegions {
  id: number;
  variantId: number;
  availableStatus: string;
  regionName: string;
}
