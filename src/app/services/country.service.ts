import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../interfaces/interfaces';
import { Storage } from '@ionic/storage';
import { resolve } from 'url';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
id: string = null;
URL = environment.url;

  constructor(private http: HttpClient) { }

  getCountry(id: string){
    return this.http.get<Country>(`${this.URL}/api/countries/${id}`);
  }
  getCountries() {
    return this.http.get<Country>(`${this.URL}/api/countries`);
  }
}
