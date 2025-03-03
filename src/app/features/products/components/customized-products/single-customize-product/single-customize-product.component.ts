import { Component, input } from '@angular/core';
import { CustomizeProductListingDTO } from '../../../../../shared/models/CustomizeProductListingDTO';

@Component({
  selector: 'single-customize-product',
  standalone: true,
  imports: [],
  templateUrl: './single-customize-product.component.html',
  styleUrl: './single-customize-product.component.scss',
})
export class SingleCustomizeProductComponent {
  productItem = input.required<CustomizeProductListingDTO>();
}
