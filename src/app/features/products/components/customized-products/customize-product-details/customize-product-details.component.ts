import { Component, inject, input, OnInit } from '@angular/core';
import { CustomizeVariantDetailsDTO } from '../../../../../shared/models/customizable-products/CustomizeProductVariantDTO';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { CustomizeProductDetailsDTO } from '../../../../../shared/models/customizable-products/CustomizeProductDetailsDTO';
import {
  MatButtonToggleChange,
  MatButtonToggleModule,
} from '@angular/material/button-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { ProductapiService } from '../../../services/product-api.service';
import {
  ProductSizeGuideDTO,
  ProductSizeGuideResponse,
  SizeTableDTO,
} from '../../../models/ProductSizeGuideResponse';
import { SizeTableTypeEnum } from '../../../enums/size-table-type.enum';
import { MatTabsModule } from '@angular/material/tabs';
import { SingeMeasurmentItemComponent } from '../../singe-measurment-item/singe-measurment-item.component';

interface colorItem {
  colorName: string;
  colorCode: string;
}
@Component({
  selector: 'customize-product-details',
  standalone: true,
  imports: [
    MatButtonToggleModule,
    MatTooltipModule,
    FormsModule,
    MatExpansionModule,
    MatTabsModule,
    SingeMeasurmentItemComponent,
  ],
  templateUrl: './customize-product-details.component.html',
  styleUrl: './customize-product-details.component.scss',
})
export class CustomizeProductDetailsComponent implements OnInit {
  productItem = input.required<CustomizeProductDetailsDTO>();
  selectedVariant!: CustomizeVariantDetailsDTO;
  totalPrice = 0;
  formbuilder = inject(FormBuilder);
  colors: colorItem[] = [];
  sizes: string[] = [];
  selectedColor = '';
  selectedSize = '';
  productApiService = inject(ProductapiService);
  sizeGuide: ProductSizeGuideDTO | undefined;
  productMeasurements: SizeTableDTO[] | undefined;
  internationalMeasurements: SizeTableDTO[] | undefined;
  selfMeasurements: SizeTableDTO[] | undefined;
  sizeUnit: 'cm' | 'inches' = 'cm';

  productForm: FormGroup = this.formbuilder.group({
    size: ['', [Validators.required]],
    color: ['', [Validators.required]],
    quantity: [1, [Validators.required]],
    variantPId: ['', [Validators.required]],
  });

  ngOnInit() {
    this.productItem().customizableVarints.sort(
      (a, b) => a.printfulId - b.printfulId
    );
    this.selectedVariant = this.productItem().customizableVarints[0];
    this.productForm.patchValue({
      variantPId: this.selectedVariant.printfulId,
    });
    this.totalPrice = this.selectedVariant.price;
    this.mapColorsAndSizes();
  }

  mapColorsAndSizes() {
    this.productItem().customizableVarints.forEach(
      (element: CustomizeVariantDetailsDTO) => {
        this.colors.push({
          colorCode: element.colorCode1,
          colorName: element.color,
        });
        this.sizes.push(element.size);
      }
    );
    this.colors = [
      ...new Map(this.colors.map((item) => [item.colorCode, item])).values(),
    ];
    this.sizes = [...new Map(this.sizes.map((item) => [item, item])).values()];
    this.productForm.patchValue({
      color: this.colors[0].colorCode,
    });
    this.selectedColor = this.colors[0].colorCode;
    this.productForm.patchValue({
      size: this.sizes[0],
    });
    this.selectedSize = this.sizes[0];
  }

  selectVariant(variant: CustomizeVariantDetailsDTO) {
    this.selectedVariant = variant;
    this.productForm.patchValue({
      size: variant.size,
      color: variant.color,
      variantPId: variant.printfulId,
    });
    this.totalPrice =
      variant.price * this.productForm.controls['quantity'].value
        ? this.productForm.controls['quantity'].value
        : 1;
  }

  colorChanged(event: MatButtonToggleChange) {
    this.productForm.patchValue({
      color: event.value,
    });
    this.setVariant();
  }

  sizeChanged(event: MatButtonToggleChange) {
    this.productForm.patchValue({
      size: event.value,
    });
    this.setVariant();
  }

  setVariant() {
    let variant = this.productItem().customizableVarints.find(
      (item) =>
        item.colorCode1 == this.selectedColor && item.size == this.selectedSize
    );

    this.selectedVariant = variant
      ? variant
      : this.productItem().customizableVarints[0];
  }

  getSizeGuide() {
    if (!this.sizeGuide) {
      this.productApiService
        .GetProductSizeGuideByProductId(Number(this.productItem().printfulId))
        .subscribe((response: ProductSizeGuideResponse) => {
          if (response.isSuccessful) {
            this.sizeGuide = response.data;
            this.productMeasurements = this.sizeGuide.sizeTables.filter(
              (item) => item.type == SizeTableTypeEnum.product_measure
            );
            this.selfMeasurements = this.sizeGuide.sizeTables.filter(
              (item) => item.type == SizeTableTypeEnum.measure_yourself
            );
            this.internationalMeasurements = this.sizeGuide.sizeTables.filter(
              (item) => item.type == SizeTableTypeEnum.international
            );
          }
        });
    }
  }
}
