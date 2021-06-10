import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  apiUrl = 'https://localhost:44393/api/colors/getall';
  constructor(private httpClient: HttpClient) {}
  
  getColors():Observable<ListResponseModel<Color>> {
    return this.httpClient.get<ListResponseModel<Color>>(this.apiUrl);
  }

  add(color : Color):  Observable<ListResponseModel<Color>> {
    let newPath = this.apiUrl + "/add";
    return this.httpClient.post<ListResponseModel<Color>>(newPath, color)
  }
  update(color : Color):  Observable<ListResponseModel<Color>> {
    let newPath = this.apiUrl + "/update";
    return this.httpClient.put<ListResponseModel<Color>>(newPath, color)
  }
}