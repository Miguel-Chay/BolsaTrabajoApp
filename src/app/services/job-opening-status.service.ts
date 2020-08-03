import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JobOpeningStatus } from '../interfaces/interfaces';
import { resolve } from 'url';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class JobOpeningStatusService {


//http://localhost:8080/api/job-opening-statuses/1
    id: string = null;
  	URL = environment.url;
  	constructor(private http: HttpClient) { }

  //returna una lista de todos los trabajos con estado =1=open
  getJobOpeningStatus(id :string){
    return this.http.get<JobOpeningStatus>(`${this.URL}/api/job-opening-statuses/${id}`);
  }
}
