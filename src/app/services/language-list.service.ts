import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LanguageList } from '../interfaces/interfaces';
import { resolve } from 'url';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LanguageListService {

  	URL = environment.url;
  	constructor(private http: HttpClient) { }


  	//regresa una lista de los lenguajes 
  	getListComplete(){
  		return this.http.get<LanguageList>(`${this.URL}/api/language-lists`);
  	}

  	getLanguage(id : string){
  		return this.http.get<LanguageList>(`${this.URL}/api/language-lists/${id}`);
  	}

}
