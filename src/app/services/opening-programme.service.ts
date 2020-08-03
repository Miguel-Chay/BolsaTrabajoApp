import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OpeningProgramme } from '../interfaces/interfaces';
import { resolve } from 'url';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OpeningProgrammeService {

  id: string = null;
  URL = environment.url;
  constructor(private http: HttpClient) { }
  
  //http://localhost:8080/api/opening-programme/sprogrammes/?id=30
  getStudyProgrammeByOrganization(id:string) {
    return this.http.get<OpeningProgramme>(`${this.URL}/api/opening-programme/sprogrammes/?id=${id}`);
  }
  

}
