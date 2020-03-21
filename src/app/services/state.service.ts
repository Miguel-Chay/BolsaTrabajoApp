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

  // regresa una lista de estados que tienen la id del pais
  getStateByCountry(id: string) {
    return this.http.get<State>(`${this.URL}/api/state/lists/?id=${id}`);
  }
}
