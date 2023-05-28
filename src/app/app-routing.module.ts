import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { HomeComponent } from './home/home.component';
import { ProductFormComponent } from './product-form/product-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [() => inject(AuthService).canActivate()],
  },
  {
    path: 'product-form',
    component: ProductFormComponent,
    canActivate: [() => inject(AuthService).canActivate()],
  },
  {
    path: 'product-form/:id',
    component: ProductFormComponent,
    canActivate: [() => inject(AuthService).canActivate()],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
