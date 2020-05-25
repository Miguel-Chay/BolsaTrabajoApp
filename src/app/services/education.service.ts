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

  createEducation(data: any) {
    return this.http.post(`${this.URL}/api/educations`, data);
  }

}
