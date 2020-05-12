import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LineBusiness } from '../interfaces/interfaces';
import { resolve } from 'url';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LineBusinessService {

  id: string = null;
  URL = environment.url;

  constructor(private http: HttpClient) { }

  getLineBusiness(id : string){
  	return this.http.get<LineBusiness>(`${this.URL}/api/line-businesses/${id}`);
  }
//returna una lista de todos los giros de negocio
  getLineBusinesslist(){
  	return this.http.get<LineBusiness>(`${this.URL}/api/line-business/view-list-complete`);
  }

}
