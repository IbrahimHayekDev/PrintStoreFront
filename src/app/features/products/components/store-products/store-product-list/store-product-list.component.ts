import { Component, inject, OnInit } from '@angular/core';
import { ProductListingResponse } from '../../../models/ProductListingResponse';
import { StoreProductListingDTO } from '../../../../../shared/models/StoreProductListingDTO';
import { ProductapiService } from '../../../services/product-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SingleStoreProductComponent } from '../single-store-product/single-store-product.component';

@Component({
  selector: 'store-product-list',
  standalone: true,
  imports: [SingleStoreProductComponent],
  templateUrl: './store-product-list.component.html',
  styleUrl: './store-product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.categoryId = params['id'];
    });
    this.getProducts();
  }

  productApiService = inject(ProductapiService);
  route = inject(ActivatedRoute);
  products: StoreProductListingDTO[] = [];
  categoryId: string = '';
  router = inject(Router);

  getProducts() {
    this.productApiService
      .GetStoreProductsByCategortyId(Number(this.categoryId))
      .subscribe((response: ProductListingResponse) => {
        if (response.isSuccessful) {
          this.products = response.data.items;
        }
      });
  }

  navigateToProductDetails(productId: number) {
    this.router.navigateByUrl(`home`);
  }
}
