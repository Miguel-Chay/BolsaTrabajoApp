import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrganizationUnit } from '../interfaces/interfaces';
import { resolve } from 'url';


@Injectable({
  providedIn: 'root'
})
export class OrganizationUnitService {

  id: string = null;

  constructor(private http: HttpClient) { }

  getOrganizationUnit(id : string){
  	return this.http.get<OrganizationUnit>(`http://localhost:8080/api/organization-units/${id}`);
  }
}
