import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { City } from '../interfaces/interfaces';
import { Storage } from '@ionic/storage';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  id: string = null;


  constructor(private http: HttpClient) { }

  getCity(id : string){
  	return this.http.get<City>(`http://localhost:8080/api/cities/${id}`);
  }
//Irving.peniche    	123

}
