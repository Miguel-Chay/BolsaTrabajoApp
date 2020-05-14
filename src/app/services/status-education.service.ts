import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { StatusEducation } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class StatusEducationService {
  URL = environment.url;
  constructor(private http: HttpClient) { }

  getStatusEducations() {
    return this.http.get<StatusEducation>(`${this.URL}/api/status-education`);
  }
}
