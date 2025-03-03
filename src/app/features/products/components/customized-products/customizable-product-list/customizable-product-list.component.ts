import { Component, inject, input, OnInit } from '@angular/core';
import { ProductapiService } from '../../../services/product-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomizeProductListingResponse } from '../../../models/CustomizeProductListingResponse';
import { SingleCustomizeProductComponent } from '../single-customize-product/single-customize-product.component';
import { CustomizeProductListingDTO } from '../../../../../shared/models/CustomizeProductListingDTO';
import { NoDataComponent } from '../../../../../shared/components/no-data/no-data.component';

@Component({
  selector: 'customizable-product-list',
  standalone: true,
  imports: [SingleCustomizeProductComponent, NoDataComponent],
  templateUrl: './customizable-product-list.component.html',
  styleUrl: './customizable-product-list.component.scss',
})
export class CustomizableProductListComponent implements OnInit {
  ngOnInit(): void {}

  products = input.required<CustomizeProductListingDTO[]>();
  Title = input.required<string>();
  router = inject(Router);

  navigateToProductDetails(productId: number) {
    this.router.navigateByUrl(`/products/customize-product/${productId}`);
  }
}
