import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentalDetails } from '../models/rental-detail';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl = 'https://localhost:44393/api/rentals/getrentaldetails';
  rentableCar: RentalDetails

  constructor(private httpClient: HttpClient) { }

  getRentals(): Observable<ListResponseModel<Rental>> {
    return this.httpClient.get<ListResponseModel<Rental>>(this.apiUrl);
  }

  add(rental: Rental): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "addrental", rental);
  }

  setRentableCar(rental: RentalDetails) {
    this.rentableCar = rental
  }

  getRentableCar(): RentalDetails {
    return this.rentableCar;
  }

  addRental(rental:Rental){
    let newPath = this.apiUrl+"rentals/add";
    return this.httpClient.post(newPath,rental).subscribe();
  }
  
}