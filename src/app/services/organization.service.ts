import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Organization } from '../interfaces/interfaces';
import { resolve } from 'url';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
	id: string = null;
  	URL = environment.url;
  	constructor(private http: HttpClient) { }


  	getOrganization(id:string){
    	return this.http.get<Organization>(`${this.URL}/api/organizations/${id}`);
  	}

  	//http://localhost:8080/api/organization/view-logo/?id=105

  	getLogo(id:string){
    	return this.http.get<Organization>(`${this.URL}/api/organization/view-logo/?id=${id}`);
  	}
}
