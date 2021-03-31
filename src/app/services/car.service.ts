import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl = 'https://localhost:44393/api/';
  constructor(private httpClient: HttpClient) {}

  getCars():Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + "cars/getcardetail"
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByBrand(brandId:number):Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + "cars/getcarsbybrandid?id=" + brandId
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByColor(colorId:number):Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + "cars/getcarsbycolorid?id=" + colorId
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  
  

  ImagesByCarId(carId:number):Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl+"carimages/getimagesbycarid?id="+carId;
  return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }

}