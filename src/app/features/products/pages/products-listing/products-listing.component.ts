import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CustomizableProductListComponent } from '../../components/customized-products/customizable-product-list/customizable-product-list.component';
import { ActivatedRoute } from '@angular/router';
import { CustomizeProductListingResponse } from '../../models/CustomizeProductListingResponse';
import { ProductapiService } from '../../services/product-api.service';
import {
  CategoryDetailsResponse,
  CustomizeProductListingDTO,
} from '../../../../shared/models/CustomizeProductListingDTO';
import { ProductSubcategoryFilterComponent } from '../../components/product-subcategory-filter/product-subcategory-filter.component';
import { CategoryDTO } from '../../../../shared/models/CategoryDTO';

@Component({
  selector: 'app-products-listing',
  standalone: true,
  imports: [
    CustomizableProductListComponent,
    ProductSubcategoryFilterComponent,
  ],
  templateUrl: './products-listing.component.html',
  styleUrl: './products-listing.component.scss',
})
export class ProductsListingComponent implements OnInit {
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.categoryId = params['categoryId'];
      this.mainCatId = Number(this.categoryId);
      this.getProducts();
    });
  }

  productApiService = inject(ProductapiService);
  route = inject(ActivatedRoute);
  mainProducts: CustomizeProductListingDTO[] = [];
  categoryId: string = '';
  subCategories: CategoryDTO[] = [];
  mainCategoryTitle = '';
  catTitle: string = '';
  mainCatId = 0;
  noMainId: number | undefined = undefined;
  @ViewChild(ProductSubcategoryFilterComponent)
  filterProducts!: ProductSubcategoryFilterComponent;

  getProducts() {
    this.productApiService
      .GetCustomieProductsByCategortyId(Number(this.categoryId))
      .subscribe((response: CustomizeProductListingResponse) => {
        if (response.isSuccessful) {
          this.mainProducts = response.data.products;
          if (this.mainProducts.length > 0) {
            this.subCategories = [
              {
                id: response.data.id,
                pId: Number(this.categoryId),
                imageUrl: '',
                title: 'Featured',
              },
              ...response.data.subCategories,
            ];
            this.catTitle = 'Featured';
            this.mainCategoryTitle = response.data.name;
          } else {
            this.subCategories = [...response.data.subCategories];
            if (response.data.subCategories.length > 0) {
              this.catTitle = response.data.subCategories[0].title;
              this.mainCategoryTitle = this.catTitle;
              this.noMainId = response.data.subCategories[0].pId;
              this.filterProducts.activeCategoryId = this.noMainId;
              this.updateProducts(response.data.subCategories[0].pId);
            }
          }
        }
      });
  }

  updateProducts(catId: number) {
    this.productApiService
      .GetCustomieProductsByCategortyId(Number(catId))
      .subscribe((response: CustomizeProductListingResponse) => {
        if (response.isSuccessful) {
          this.mainProducts = response.data.products;
          this.catTitle =
            this.mainCategoryTitle == response.data.name
              ? 'Featured'
              : response.data.name;
        }
      });
  }
}
