import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LevelList } from '../interfaces/interfaces';
import { resolve } from 'url';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LevelListService {

	URL = environment.url;
  	constructor(private http: HttpClient) { }


  	//regresa una lista de los lenguajes 
  	getLevelListComplete(){
  		return this.http.get<LevelList>(`${this.URL}/api/level-lists`);
  	}

  	getLevel(id : string){
  		return this.http.get<LevelList>(`${this.URL}/api/level-lists/${id}`);
  	}
}
