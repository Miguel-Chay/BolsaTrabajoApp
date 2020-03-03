import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { City } from '../interfaces/interfaces';
import { Storage } from '@ionic/storage';
import { resolve } from 'url';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  id: string = null;
  URL = environment.url;

  constructor(private http: HttpClient) { }

  getCity(id : string){
  	return this.http.get<City>(`${this.URL}/api/cities/${id}`);
  }

}
