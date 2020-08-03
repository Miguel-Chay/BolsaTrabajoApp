import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OpeningLanguage } from '../interfaces/interfaces';
import { resolve } from 'url';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class OpeningLanguageService {


  id: string = null;
  URL = environment.url;
  constructor(private http: HttpClient) { }
  
  //http://localhost:8080/api/opening-language/opening-languages/?id=6092
  getOpeningLanguage(id:string) {
    return this.http.get<OpeningLanguage>(`${this.URL}/api/opening-language/opening-languages/?id=${id}`);
  }
}
