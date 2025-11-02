import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuardService} from "./@core/services/auth/auth-guard.service";
import {LoginComponent} from "./auth/login/login.component";
import {LayoutComponent} from "./layout/layout/layout.component";

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      {path: '', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)},
      {path: '', redirectTo: 'products', pathMatch: 'full'}
    ]
  },
  {path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
