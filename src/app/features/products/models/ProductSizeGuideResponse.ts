import { ApiResponse } from '../../../shared/models/api-response';

export interface ProductSizeGuideResponse extends ApiResponse {
  data: ProductSizeGuideDTO;
}

export interface ProductSizeGuideDTO {
  productId: number;
  availableSizes: string[];
  sizeTables: SizeTableDTO[];
}

export interface SizeTableDTO {
  type: string;
  unit: string | null;
  description: string | null;
  imageUrl: string | null;
  imageDescription: string | null;
  measurements: MeasurementDTO[];
}

export interface MeasurementDTO {
  typeLabel: string | null;
  unit: string | null;
  values: MeasurementValueDTO[];
}

export interface MeasurementValueDTO {
  size: string;
  value: string | null;
  minValue: string | null;
  maxValue: string | null;
}
