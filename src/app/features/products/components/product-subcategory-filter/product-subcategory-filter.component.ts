import { Component, input, OnInit, output } from '@angular/core';
import { CategoryDetailsResponse } from '../../../../shared/models/CustomizeProductListingDTO';
import { CategoryDTO } from '../../../../shared/models/CategoryDTO';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'product-subcategory-filter',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './product-subcategory-filter.component.html',
  styleUrl: './product-subcategory-filter.component.scss',
})
export class ProductSubcategoryFilterComponent implements OnInit {
  ngOnInit(): void {
    this.activeCategoryId = this.mainCatId();
    if (this.noMainId()) {
      this.activeCategoryId = this.noMainId();
    }
  }
  subCategories = input.required<CategoryDTO[]>();
  mainCatId = input.required<number>();
  noMainId = input<number>();
  newCategory = output<number>();
  activeCategoryId: number | undefined = 0;

  onCategoryChange(catId: number) {
    this.newCategory.emit(catId);
    this.activeCategoryId = catId;
  }
}
