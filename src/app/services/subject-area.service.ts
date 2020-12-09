import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SubjectArea } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class SubjectAreaService {
  URL = environment.url;
  constructor(private http: HttpClient) { }

  getSubjectAreas() {
    return this.http.get<SubjectArea>(`${this.URL}/api/subject-areas`);
  }

  getSubjectArea(id: string) {
    return this.http.get<SubjectArea>(`${this.URL}/api/subject-areas/${id}`);
  }
}
