import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import{ FormsModule, ReactiveFormsModule } from "@angular/forms"



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrandComponent } from './component/brand/brand.component';
import { ColorComponent } from './component/color/color.component';
import { CarComponent } from './component/car/car.component';
import { RentalComponent } from './component/rental/rental.component';
import { NaviComponent } from './component/navi/navi.component';
import { CustomerComponent } from './component/customer/customer.component';
import { CarDetailComponent } from './component/car-detail/car-detail.component';
import { CarRentComponent } from './component/car-detail/car-rent/car-rent.component';
import { BrandFilterPipePipe } from './pipes/brand-filter-pipe.pipe';
import { ColorFilterPipePipe } from './pipes/color-filter-pipe.pipe';
import { CarFilterPipePipe } from './pipes/car-filter-pipe.pipe';
import { CarFilterComponent } from './component/car-filter/car-filter.component';
import { CardComponent } from './component/card/card.component';

import {ToastrModule} from "ngx-toastr"
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { BrandAddComponent } from './component/brand-add/brand-add.component';
import { CarAddComponent } from './component/car-add/car-add.component';
import { ColorAddComponent } from './component/color-add/color-add.component';
import { BrandUpdateComponent } from './component/brand-update/brand-update.component';
// import { BrandListComponent } from './component/brand-list/brand-list.component';
// import { ColorListComponent } from './component/color-list/color-list.component';
import { ColorUpdateComponent } from './component/color-update/color-update.component';
import { CarUpdateComponent } from './component/car-update/car-update.component';
import { LoginComponent } from './component/login/login.component';
import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RegisterComponent } from './component/register/register.component';
// import { CarListComponent } from './component/car-list/car-list.component';

@NgModule({
  declarations: [
    AppComponent,
    BrandComponent,
    ColorComponent,
    CarComponent,
    RentalComponent,
    NaviComponent,
    CustomerComponent,
    CarDetailComponent,
    CarRentComponent,
    BrandFilterPipePipe,
    ColorFilterPipePipe,
    CarFilterPipePipe,
    CarFilterComponent,
    CardComponent,
    BrandAddComponent,
    CarAddComponent,
    ColorAddComponent,
    BrandUpdateComponent,
    // BrandListComponent,
    // ColorListComponent,
    ColorUpdateComponent,
    CarUpdateComponent,
    LoginComponent,
    RegisterComponent,
    // CarListComponent,
    
  
  ],
  imports: [BrowserModule, 
    AppRoutingModule, 
    HttpClientModule,
    FormsModule,  
    FormsModule,
    ReactiveFormsModule, 
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    })
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
