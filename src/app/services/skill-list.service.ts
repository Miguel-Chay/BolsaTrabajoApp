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

  //returna una lista de todos los giros de negocio
  	getSkillListComplete(){
	    return this.http.get<Skill>(`${this.URL}/api/skill-list/view-list-complete`);
  	}
}
