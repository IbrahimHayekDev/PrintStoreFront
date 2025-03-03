import { Component, inject, OnInit } from '@angular/core';
import { CategoryApiService } from '../../services/category-api.service';
import { CategoryDTO } from '../../../../shared/models/CategoryDTO';
import { AllCategoriesResponse } from '../../models/api-response/AllCategoriesResponse';
import { ListingCategoriesComponent } from '../../components/listing-categories/listing-categories.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [ListingCategoriesComponent],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss',
})
export class CategoryListComponent implements OnInit {
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.categoryId = params['id'];
      this.getCategories();
    });
  }
  route = inject(ActivatedRoute);
  categoryId: number = 0;
  router = inject(Router);

  categoryService = inject(CategoryApiService);
  categories: CategoryDTO[] = [];

  getCategories() {
    this.categoryService
      .GetPortalCategoriesById(this.categoryId)
      .subscribe((response: AllCategoriesResponse) => {
        if (response.isSuccessful) {
          this.categories = response.data.items;
        }
      });
  }
}
