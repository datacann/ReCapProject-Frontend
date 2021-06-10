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
        
  updateCard(creditCard:Card):Observable<ResponseModel>{
    let newPath = this.apiUrl+"creditcards/update";
    return this.httpClient.put<ResponseModel>(newPath, creditCard);
  }
  
  verifyCard(card:Card):Observable<ResponseModel>{
    let newPath = this.apiUrl+"creditcards/verifycard";
    return this.httpClient.post<ResponseModel>(newPath,card);
  }
  
  getCardsByCustomerId(customerId:number):Observable<ListResponseModel<Card>>{
    let newPath = this.apiUrl + "creditcards/getcardsbycustomerid?customerid="+customerId;
    return this.httpClient.get<ListResponseModel<Card>>(newPath);
  }

  add(creditCard:Card):Observable<ResponseModel>{
    let newPath = this.apiUrl+"creditcards/add";
    return this.httpClient.post<ResponseModel>(newPath,creditCard);
  }
}