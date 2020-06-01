import { Education } from './../interfaces/interfaces';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AcademicTraining } from '../interfaces/interfaces';
import { DegreeService } from 'src/app/services/degree.service';

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  URL = environment.url;
  constructor(private http: HttpClient, private degreeService: DegreeService) { }

  getEducation(id: string) {
    return this.http.get<AcademicTraining[]>(`${this.URL}/api/education/search/?id=${id}`);
  }
  getEducationById(id: string) {
    return this.http.get<Education>(`${this.URL}/api/educations/${id}`);
  }
  createEducation(data: any) {
    return this.http.post(`${this.URL}/api/educations`, data);
  }
  updateCandidate(id: string, data: any) {
    return this.http.put(`${this.URL}/api/educations/${id}`, data);
  }

}
