import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Education } from '../interfaces/interfaces';
import { resolve } from 'url';
import { DegreeService } from 'src/app/services/degree.service';

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  URL = environment.url;
  constructor(private http: HttpClient, private degreeService: DegreeService) { }

  getEducation(id: string) {
    return this.http.get<Education[]>(`${this.URL}/api/education/search/?id=${id}`);
  }

}
