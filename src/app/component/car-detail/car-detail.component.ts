import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/car-image';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  
  carDetail:Car
  carImages:CarImage[]
  imageBaseUrl = 'https://localhost:44393/';
  rentalControl = false;
  rentalMessage="";

  constructor(private carService:CarService, 
    private carDetailService:CarDetailService,  
    private activatedRoute:ActivatedRoute,
    private rentalService: RentalService,) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param=>{
      this.getImagesByCarId(param["carId"])
      this.getCarById(param["carId"])
    })

  }

  getImagesByCarId(carId:number){
    this.carDetailService.getImagesByCarId(carId).subscribe((response)=>{
      this.carImages = response.data
    })
  }

  getCurrentSliderImageClass(sliderImage: CarImage): string {
    if (this.carImages[0] === sliderImage) {
       return 'carousel-item active';
    }

    return 'carousel-item';
 }

  getCarById(carId:number){
    this.carService.getCars().subscribe(response=>{
      this.carDetail=response.data.find(car=>car.id==carId);
      
    })
  }
}
