import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../interfaces/interfaces';
import { Storage } from '@ionic/storage';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
id: string = null;


  constructor(private http: HttpClient) { }

  getCountry(id : string){
  	return this.http.get<Country>(`http://localhost:8080/api/countries/${id}`);
  }
}
