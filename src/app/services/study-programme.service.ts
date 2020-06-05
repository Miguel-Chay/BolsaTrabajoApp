import { Injectable } from '@angular/core';
import { StudyPrograme } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudyProgrammeService {
  URL = environment.url;
  constructor(private http: HttpClient) { }

  getallStudyProgrammes() {
    return this.http.get<StudyPrograme>(`${this.URL}/api/study-programmes`);
  }
  getStufyProgramme(id: string) {
    return this.http.get<StudyPrograme>(`${this.URL}/api/study-programmes/${id}`);
  }
  getStudyProgrammeByOrganizationUnit(id: string) {
    return this.http.get<StudyPrograme>(`${this.URL}/api/study-programme/search-by-organization-unit/?id=${id}`);
  }
  getStudyProgrammeByOrgDegree(idOrg: string, idDegree: string) {
    return this.http.get<StudyPrograme>(`${this.URL}/api/study-programme/search-by-org-degree?idOrg=${idOrg}&idDegree=${idDegree}`);
  }

  //Miguel chay  
  getallStudyProgramme() {
    return this.http.get<StudyPrograme>(`${this.URL}/api/study-programme/std-programme-list`);
  }
//http://localhost:8080/api/study-programme/search-by-area/?id=12
  getStudyProgrammeBySubjectArea(id:string) {
    return this.http.get<StudyPrograme>(`${this.URL}/api/study-programme/search-by-area/?id=${id}`);
  }
}
