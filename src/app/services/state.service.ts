import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { State } from '../interfaces/interfaces';
import { Storage } from '@ionic/storage';
import { resolve } from 'url';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  id: string = null;
  URL = environment.url;

  constructor(private http: HttpClient) { }

  getState(id : string){
  	return this.http.get<State>(`${this.URL}/api/states/${id}`);
  }
}
