import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CvSkillComplete } from '../interfaces/interfaces';
import { resolve } from 'url';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CvSkillService {

  id: string = null;
  URL = environment.url;
  constructor(private http: HttpClient) { }



  //returna una lista de todos los giros de negocio
  getCvSkillComplete(id : string){
    return this.http.get<CvSkillComplete>(`${this.URL}/api/cv-skill/cv-skill-complete/?id=${id}`);
  }
}
