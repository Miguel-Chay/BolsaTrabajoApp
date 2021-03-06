import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Skill } from '../interfaces/interfaces';
import { resolve } from 'url';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SkillListService {

   	id: string = null;
	URL = environment.url;
  	constructor(private http: HttpClient) { }
  //retorna un skill
    getSkill(id:string){
      return this.http.get<Skill>(`${this.URL}/api/skill-lists/${id}`);
    }

  //returna una lista de todos los skills
  	getSkillListComplete(){
	    return this.http.get<Skill[]>(`${this.URL}/api/skill-list/view-list-complete`);
  	}
  	getSkillExist(skill:string){
	    return this.http.get<Skill>(`${this.URL}/api/skill-list/skill-exist/?t=${skill}`);
  	}

    //agrega un Skilla un usuario
    addSkill(  skill: string) {
      const data = {  skill };
      return this.http.post<Skill>(`${this.URL}/api/skill-lists`, data)
    }
}
