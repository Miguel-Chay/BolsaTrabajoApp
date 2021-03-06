import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Candidate } from '../interfaces/interfaces';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { Resolve } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  id: string = null;
  URL = environment.url;

  constructor(private http: HttpClient, private storage: Storage) { }

  getCandidate(id : string){
  	return this.http.get<Candidate>(`${this.URL}/api/candidates/${id}`);
  }
  
  getPhoto(id : string){
  	return this.http.get<Candidate>(`${this.URL}/api/candidate/view-photo/?id=${id}`);
  }

  updateCandidate(id: string, data: any) {
    return new Promise((resolve, reject) => {
      this.http.put(`${this.URL}/api/candidates/${id}`, data).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }
}
