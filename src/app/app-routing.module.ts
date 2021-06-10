import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './component/brand-add/brand-add.component';
// import { BrandListComponent } from './component/brand-list/brand-list.component';
// import { BrandListComponent } from './component/brand-list/brand-list.component';
import { BrandUpdateComponent } from './component/brand-update/brand-update.component';
import { CarAddComponent } from './component/car-add/car-add.component';
import { CarDetailComponent } from './component/car-detail/car-detail.component';
// import { CarListComponent } from './component/car-list/car-list.component';
import { CarUpdateComponent } from './component/car-update/car-update.component';
import { CarComponent } from './component/car/car.component';
import { CardComponent } from './component/card/card.component';
import { ColorAddComponent } from './component/color-add/color-add.component';
// import { ColorListComponent } from './component/color-list/color-list.component';
import { ColorUpdateComponent } from './component/color-update/color-update.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: CarComponent },
  { path: 'cars', component: CarComponent },
  { path: 'cars/brand/:brandId', component: CarComponent },
  { path: 'cars/color/:colorId', component: CarComponent },
  { path: 'cars/getcardetail/:carId', component: CarDetailComponent },
  
  {path:"cars/filter/brand/:brandId",component:CarComponent},
  {path:"cars/filter/color/:colorId",component:CarComponent},
  {path:"cars/filter/brand/:brandId/color/:colorId",component:CarComponent},

  { path: 'card', component: CardComponent },

  {path : "cars/add", component : CarAddComponent, canActivate:[LoginGuard] },
  {path : "brands/add", component : BrandAddComponent,canActivate:[LoginGuard] },
  {path : "colors/add", component : ColorAddComponent,canActivate:[LoginGuard] },

  {path : "brands/update", component : BrandUpdateComponent,canActivate:[LoginGuard] },
  // {path : "brands/list", component : BrandListComponent},

  // {path : "colors/list", component : ColorListComponent},
  {path : "colors/update", component : ColorUpdateComponent,canActivate:[LoginGuard] },

  {path : "cars/update", component : CarUpdateComponent,canActivate:[LoginGuard] },
  
  // {path : "cars/list", component : CarListComponent},
  
  {path : "login", component : LoginComponent},

  {path:"register",component:RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
