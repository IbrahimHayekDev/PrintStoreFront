import { Component, input } from '@angular/core';
import { CategoryDTO } from '../../../../shared/models/CategoryDTO';

@Component({
  selector: 'singe-category-item',
  standalone: true,
  imports: [],
  templateUrl: './singe-category-item.component.html',
  styleUrl: './singe-category-item.component.scss',
})
export class SingeCategoryItemComponent {
  categoryItem = input.required<CategoryDTO>();
}
