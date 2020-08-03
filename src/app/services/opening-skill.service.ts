import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OpeningSkill } from '../interfaces/interfaces';
import { resolve } from 'url';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class OpeningSkillService {


  id: string = null;
  URL = environment.url;
  constructor(private http: HttpClient) { }
  //http://localhost:8080/api/opening-skill/opening-skill-complete/?id=20
  //returna una lista de todos los skills 
  getOpeningSkillComplete(id : string){
    return this.http.get<OpeningSkill>(`${this.URL}/api/opening-skill/opening-skill-complete/?id=${id}`);
  }
}
