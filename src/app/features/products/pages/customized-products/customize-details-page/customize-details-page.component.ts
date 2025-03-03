import { Component, inject, OnInit } from '@angular/core';
import { CustomizeProductDetailsComponent } from '../../../components/customized-products/customize-product-details/customize-product-details.component';
import { CustomizeProductDetailsDTO } from '../../../../../shared/models/customizable-products/CustomizeProductDetailsDTO';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductapiService } from '../../../services/product-api.service';
import { CustomizeProductDetailsResponse } from '../../../models/CustomizeProductDetailsResponse';

@Component({
  selector: 'app-customize-details-page',
  standalone: true,
  imports: [CustomizeProductDetailsComponent],
  templateUrl: './customize-details-page.component.html',
  styleUrl: './customize-details-page.component.scss',
})
export class CustomizeDetailsPageComponent implements OnInit {
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productId = params['id'];
    });
    this.getProduct();
  }
  product!: CustomizeProductDetailsDTO;

  productApiService = inject(ProductapiService);
  route = inject(ActivatedRoute);
  productId: string = '';
  router = inject(Router);

  getProduct() {
    this.productApiService
      .GetCustomizeProducDetailstbyId(Number(this.productId))
      .subscribe((response: CustomizeProductDetailsResponse) => {
        if (response.isSuccessful) {
          this.product = response.data;
        }
      });
  }
}
