import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
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
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"

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
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
