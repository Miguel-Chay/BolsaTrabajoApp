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

  //regresa una experiencia de trabajo
  getWorkExperience(id : string){
    return this.http.get<WorkExperience>(`${this.URL}/api/work-experiences/${id}`);
  }

  //regresa la lista de experiencias de trabajo id= cv_id
  getWorkExperiences(id : string){
  	return this.http.get<WorkExperience>(`${this.URL}/api/work-experience/wexperience-list/?id=${id}`);
  }
  
  //regresa la lista de workexperience con una variable name  (nombre de la linea de trabajo) id= cv_id
  getWorkExComplete(id : string){
    return this.http.get<WorkExperience>(`${this.URL}/api/work-experience/wexp-complete/?id=${id}`);
  }

  //agrega una nuevo work-experience
  addWorkExperience(cv_id : string,company: string, line_business_id: string,job_title: string,month_start: string,year_start: string,
    month_end: string, year_end: string,description: string,is_current_job:string) {
    
    if (is_current_job=="1") {
      const data = {cv_id, company, line_business_id, job_title, month_start, year_start, is_current_job, description };
      return this.http.post<WorkExperience>(`${this.URL}/api/work-experiences`, data)
    }
    else{
      const data = {cv_id, company, line_business_id, job_title, month_start, year_start, month_end, year_end, description };
      return this.http.post<WorkExperience>(`${this.URL}/api/work-experiences`, data)
    }
  }


  //actualiza una experiencia de acuerdo al id modifica todo 
  updateWorkExperience(id: string,company: string, line_business_id: string,job_title: string,month_start: string,year_start: string,
    month_end: string, year_end: string,description: string,iscurrentjob:boolean){
    var is_current_job 
 
    if (iscurrentjob==true) {
      is_current_job="1"
      const data = {company, line_business_id, job_title, month_start, year_start, is_current_job, description };
      return this.http.put<WorkExperience>(`${this.URL}/api/work-experiences/${id}`, data)
    }
    else{
      is_current_job="0"
      const data = { company, line_business_id, job_title, month_start, year_start, month_end, year_end, description };
      return this.http.put <WorkExperience>(`${this.URL}/api/work-experiences/${id}`, data)
    }

  }
  //elimina una workexperience segun su id
  deleteWorkExperience(id : string){
    return this.http.delete<WorkExperience>(`${this.URL}/api/work-experiences/${id}`);
  }

}
