import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Candidate } from '../interfaces/interfaces';
import { Storage } from '@ionic/storage';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  id: string = null;


  constructor(private http: HttpClient) { }

  getCandidate(id : string){

  	return this.http.get<Candidate>(`http://localhost:8080/candidates/${id}`);

  }
//Irving.peniche    	123
}
