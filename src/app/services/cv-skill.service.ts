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



  //returna una lista de todos los skills 
  getCvSkillComplete(id : string){
    return this.http.get<CvSkillComplete>(`${this.URL}/api/cv-skill/cv-skill-complete/?id=${id}`);
  }

  getCvSkillExist(cv_id : string, skill_list_id :string){
    return this.http.get<CvSkillComplete>(`${this.URL}/api/cv-skill/cv-skill-exist/?c=${cv_id}&s=${skill_list_id}`);
  }

  //agrega un CvSkill a un usuario
    addCvSkill( cv_id: string, skill_list_id: string, skill: string) {
      const data = { cv_id, skill_list_id,skill };
      return this.http.post<CvSkillComplete>(`${this.URL}/api/cv-skills`, data)
    }

    //elimina un skill  http://localhost:8080/api/cv-skill/del-cvskill/?c=86&s=352
    deleteCvSkill(cv_id : string, skill_list_id:string){
      return this.http.get<CvSkillComplete>(`${this.URL}/api/cv-skill/del-cvskill/?c=${cv_id}&s=${skill_list_id}`);
    }  


    // prueba(id: string ) {
    //   return new Promise((resolve, reject) => {
    //     this.http.get<CvSkillComplete>(`${this.URL}/api/cv-skill/cv-skill-complete/?id=${id}`).subscribe(res => {
    //     resolve(res);
    //   }, (err) => {
    //     reject(err);});         
    //   });
  // }



}
