import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Degree } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DegreeService {
  URL = environment.url;
  constructor(private http: HttpClient)  { }

  getDegree(id: string) {
    return this.http.get<Degree>(`${this.URL}/api/degrees/${id}`);
  }
  getDegres() {
    return this.http.get<Degree>(`${this.URL}/api/degrees`);
  }
}
