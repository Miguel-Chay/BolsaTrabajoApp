import { Match } from './../interfaces/interfaces';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JobsOpening } from '../interfaces/interfaces';
import { resolve } from 'url';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobOpeningService {
	  id: string = null;
  	URL = environment.url;
  	constructor(private http: HttpClient) { }

  //returna una lista de todos los trabajos con estado =1=open
  getJobsListOpen(){
    return this.http.get<JobsOpening>(`${this.URL}/api/job-opening/jobs-list-open`);
  }

  getJobOpening(id:string){
    return this.http.get<JobsOpening>(`${this.URL}/api/job-openings/${id}`);
  }

  //http://localhost:8080/api/job-opening/is-open/?id=64
  getIsOpen(id:string){
    return this.http.get<JobsOpening>(`${this.URL}/api/job-opening/is-open/?id=${id}`);
  }

  jobsMatch(data: any) {
    return this.http.post<Match>(`${this.URL}/api/job-opening/jobs-match`, data);
  }
}
