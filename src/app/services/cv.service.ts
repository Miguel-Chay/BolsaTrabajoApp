import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cv, CvMatch } from '../interfaces/interfaces';
import { Storage } from '@ionic/storage';
import { resolve } from 'url';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CvService {

  id: string = null;
  URL = environment.url;

  constructor(private http: HttpClient) { }

  getCv(id : string){
  	return this.http.get<Cv>(`${this.URL}/api/cvs/${id}`);
  }



  updateCv(id : string,status: string, summary: string) {
    const data = {id, status, summary };

    return this.http.put<Cv>(`${this.URL}/api/cvs/${id}`, data)
  };

  matchCv(id: string) {
    return this.http.get<any>(`${this.URL}/api/cv/match/?id=${id}`);
  }
  

}
