import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrganizationUnit } from '../interfaces/interfaces';
import { resolve } from 'url';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class OrganizationUnitService {

  id: string = null;
  URL = environment.url;
  constructor(private http: HttpClient) { }

  getOrganizationUnit(id : string){
  	return this.http.get<OrganizationUnit>(`${this.URL}/api/organization-units/${id}`);
  }

  getOrganizationUnits() {
    return this.http.get<OrganizationUnit>(`${this.URL}/api/organization-units`);
  }
}
