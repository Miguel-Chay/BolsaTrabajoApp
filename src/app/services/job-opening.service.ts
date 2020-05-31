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

}
