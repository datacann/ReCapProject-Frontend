import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../models/card';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  apiUrl = "https://localhost:44393/api/";

  constructor(private httpClient:HttpClient) { }

  getByCardNumber(cardNumber:string):Observable<ListResponseModel<Card>>{
    let newPath = this.apiUrl+"creditcards/getbycardnumber?cardNumber="+cardNumber;
    return this.httpClient.get<ListResponseModel<Card>>(newPath);
  }

  
  getCreditCard():Observable<ListResponseModel<Card>> {
    let newPath = this.apiUrl + "creditcards/getall"
    return this.httpClient.get<ListResponseModel<Card>>(newPath);
  }
        
  updateCard(card:Card){
    let newPath = this.apiUrl+"creditcards/update";
    this.httpClient.put(newPath,card);
  }
  
  verifyCard(card:Card):Observable<ResponseModel>{
    let newPath = this.apiUrl+"creditcards/verifycard";
    return this.httpClient.post<ResponseModel>(newPath,card);
  }
  
}