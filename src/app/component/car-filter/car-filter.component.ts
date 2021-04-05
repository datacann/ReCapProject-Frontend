import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-filter',
  templateUrl: './car-filter.component.html',
  styleUrls: ['./car-filter.component.css']
})
export class CarFilterComponent implements OnInit {
  brands: Brand[] = [];
  colors: Color[] = [];
  brandIdFilter : number;
  colorIdFilter : number;
  currentBrand:number;
  currentColor:number;

  constructor(
    private brandService:BrandService,
    private colorService:ColorService) { }

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
  }

  getBrands(){
    this.brandService.getBrands().subscribe(respone => {
      this.brands = respone.data;
    })
  }

  IsCurrentBrandNull(){
    if(this.currentBrand){
      return true;
    }else{
      return false;
    }
  }

  IsCurrentColorNull(){
    if(this.currentColor){
      return true;
    }else{
      return false;
    }
  }

  getColors(){
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
    })
  }
  
  getCurrentBrand(brand:Brand){
    if(this.currentBrand==brand.brandId){
      return true;
    }else{
      return false;
    }
  }

  getCurrentColor(color:Color){
    if(color.colorId==this.currentColor){
      return true;
    }else{
      return false;
    }
  }

  getRouterLink(){
    if(this.currentBrand && this.currentColor){
      return "/cars/filter/brand/"+this.currentBrand+"/color/"+this.currentColor;
      
    }else if(this.currentBrand){
      return "/cars/filter/brand/"+this.currentBrand;
    }else if(this.currentColor){
      return "/cars/filter/color/"+this.currentColor;
    }else{
      return "/cars";
    }
  }


  
}