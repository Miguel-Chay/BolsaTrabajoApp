import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WorkExperience } from '../interfaces/interfaces';
import { resolve } from 'url';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkExperienceService {
  
  id: string = null;
  URL = environment.url;
  constructor(private http: HttpClient) { }

  getWorkExperiences(id : string){
  	return this.http.get<WorkExperience>(`${this.URL}/api/work-experience/wexperience-list/?id=${id}`);
  }
  
  // getWorkExperience(id : string){
  //  	return this.http.get<WorkExperience>(`${this.URL}/api/work-experiences/${id}`);
  // }
}
