import { Certification } from './../interfaces/interfaces';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CertificationService {
  URL = environment.url;
  constructor(private http: HttpClient) { }

  getCertifications(id: string) {
    return this.http.get<Certification>(`${this.URL}/api/certification/search/?id=${id}`);
  }
  getCertificationByIdCertification(id: string) {
    return this.http.get<Certification>(`${this.URL}/api/certifications/${id}`);
  }
  createCertification(data: any) {
    return this.http.post(`${this.URL}/api/certifications`, data);
  }

  DeleteCertification(id: string) {
    return this.http.delete(`${this.URL}/api/certifications/${id}`);
  }

  updateCertification(id: string, data: any) {
    return this.http.put(`${this.URL}/api/certifications/${id}`, data);
  }
}
