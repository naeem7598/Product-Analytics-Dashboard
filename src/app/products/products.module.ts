import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductsComponent} from './products/products.component';
import {ProductDetailsComponent} from './product-details/product-details.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../@shared/shared.module";

const routes: Routes = [
  {path: 'products', component: ProductsComponent},
  { path: '', redirectTo: 'products', pathMatch: 'full' }, // Default route
  {path: 'products/:id', component: ProductDetailsComponent}
]


@NgModule({
  declarations: [
    ProductsComponent,
    ProductDetailsComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule
    ]
})
export class ProductsModule {
}
