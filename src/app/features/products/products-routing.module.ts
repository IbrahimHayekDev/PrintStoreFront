import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/store-products/store-product-list/store-product-list.component';
import { CustomizableProductListComponent } from './components/customized-products/customizable-product-list/customizable-product-list.component';
import { CustomizeDetailsPageComponent } from './pages/customized-products/customize-details-page/customize-details-page.component';
import { ProductsListingComponent } from './pages/products-listing/products-listing.component';

const routes: Routes = [
  {
    path: 'product-listing/:categoryId',
    component: ProductsListingComponent,
  },
  {
    path: 'customize-product/:id',
    component: CustomizeDetailsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
