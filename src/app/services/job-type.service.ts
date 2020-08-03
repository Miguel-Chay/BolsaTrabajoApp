import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JobType } from '../interfaces/interfaces';
import { resolve } from 'url';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class JobTypeService {

  	id: string = null;
  	URL = environment.url;
  	constructor(private http: HttpClient) { }

  //returna una lista de todos los trabajos con estado =1=open
  getJobsListType(){
    return this.http.get<JobType>(`${this.URL}/api/job-types`);
  }

  getJobType(id:string){
    return this.http.get<JobType>(`${this.URL}/api/job-types/${id}`);
  }
}
