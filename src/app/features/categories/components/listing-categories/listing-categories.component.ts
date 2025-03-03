import { Component, inject, input, OnInit } from '@angular/core';
import { SingeCategoryItemComponent } from '../singe-category-item/singe-category-item.component';
import { CategoryDTO } from '../../../../shared/models/CategoryDTO';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'listing-categories',
  standalone: true,
  imports: [SingeCategoryItemComponent],
  templateUrl: './listing-categories.component.html',
  styleUrl: './listing-categories.component.scss',
})
export class ListingCategoriesComponent {
  categories = input.required<CategoryDTO[]>();
  productType = input.required<number>();
  router = inject(Router);
  route = inject(ActivatedRoute);

  navigateToProductListing(id: number) {
    this.router.navigateByUrl(`/products/product-listing/${id}`);
  }
}
