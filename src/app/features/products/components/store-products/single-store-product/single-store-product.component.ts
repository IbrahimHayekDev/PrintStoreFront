import { Component, input } from '@angular/core';
import { StoreProductListingDTO } from '../../../../../shared/models/StoreProductListingDTO';

@Component({
  selector: 'single-store-product',
  standalone: true,
  imports: [],
  templateUrl: './single-store-product.component.html',
  styleUrl: './single-store-product.component.scss',
})
export class SingleStoreProductComponent {
  productItem = input.required<StoreProductListingDTO>();
}
