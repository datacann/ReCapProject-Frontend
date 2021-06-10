import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

  dataLoaded = false;
  carUpdateForm : FormGroup;

  cars:Car[] = [];
  
  colors :Color[] = [];
  brands :Brand[] = [];

  id : number;
  colorId : number;
  brandId : number;

  
  selectedCar : Car
  selectedColor : Color
  selectedBrand : Brand

  constructor(private formBuilder:FormBuilder, 
    private carService: CarService,    
    private activatedRoute: ActivatedRoute,
    private toastrService:ToastrService,
    
    private colorService : ColorService,
    private brandService : BrandService) { }

  ngOnInit(): void {  

        this.createCarUpdateForm();
        this.getAllCars();        
        this.getAllBrands();
        this.getAllColors();        
      }
      
  
  getAllCars()
  {
    this.carService.getCars().subscribe(response =>{
      this.cars = response.data;
      this.dataLoaded = response.success
    });
  }
  getAllBrands()
  {
    this.brandService.getBrands().subscribe(response =>{
      this.brands = response.data;
      this.dataLoaded = response.success
    });
  }
 
  
  getAllColors() {
    this.colorService.getColors().subscribe(response=>{
      this.colors = response.data;
      this.dataLoaded = response.success;
    })
  }
  createCarUpdateForm()
  {
    this.carUpdateForm = this.formBuilder.group({
      id : ["", Validators.required],   
      brandId : ["", Validators.required],
      colorId : ["", Validators.required],      
      modelYear : ["", Validators.required],
      dailyPrice : ["", Validators.required],
      description : ["", Validators.required]     
    });
  }


  update() {
    if (this.carUpdateForm.valid) {
      let cartModel = Object.assign({}, this.carUpdateForm.value);
      this.carService.update(cartModel).subscribe((response) => {
        this.toastrService.success(response.message, "Başarılı");
      },responseError=>{
        if(responseError.error.ValidationErrors.length>0){
          for (let i = 0; i <responseError.error.ValidationErrors.length; i++) {
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,"Doğrulama Hatası")
          }       
        } 
      })      
    }
    else{
      this.toastrService.error("Formunuz  Eksik", "Dikkat")   
    }
  }
  setSelectedCar(car:Car){
    this.selectedCar = car;
     
  }  
  getSelectedCar(carId : number) {
    if(this.id == carId)
    {  
      return true;
    }
    else
    {
      return false;
    }
  }
 

  setSelectedColor(color:Color){
    this.selectedColor = color;
     
  }  
  getSelectedColor(colorId : number) {
    if(this.colorId == colorId)
    {  
      return true;
    }
    else
    {
      return false;
    }
  }
  setSelectedBrand(brand:Brand){
    this.selectedBrand = brand;
     
  }  
  getSelectedBrand(brandId : number) {
    if(this.brandId == brandId)
    {  
      return true;
    }
    else
    {
      return false;
    }
  }

}