import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Candidate } from '../interfaces/interfaces';
import { Storage } from '@ionic/storage';
import { resolve } from 'url';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  id: string = null;
  URL = environment.url;

  constructor(private http: HttpClient) { }

  getCandidate(id : string){
  	return this.http.get<Candidate>(`${this.URL}/api/candidates/${id}`);
  }
  
  getPhoto(id : string){
  	return this.http.get<Candidate>(`${this.URL}/api/candidate/view-photo/?id=${id}`);
  }
}
