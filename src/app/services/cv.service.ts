import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cv } from '../interfaces/interfaces';
import { Storage } from '@ionic/storage';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class CvService {

  id: string = null;


  constructor(private http: HttpClient) { }

  getCv(id : string){
  	return this.http.get<Cv>(`http://localhost:8080/api/cvs/${id}`);
  }
}
