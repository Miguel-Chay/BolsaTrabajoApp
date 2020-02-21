import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { State } from '../interfaces/interfaces';
import { Storage } from '@ionic/storage';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  id: string = null;


  constructor(private http: HttpClient) { }

  getState(id : string){
  	return this.http.get<State>(`http://localhost:8080/api/states/${id}`);
  }
}
