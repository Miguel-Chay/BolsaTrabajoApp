import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from '../interfaces/interfaces';
import { resolve } from 'url';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

 	  URL = environment.url;
  	constructor(private http: HttpClient) { }

  	//regresa una lista de los cursos de un usuario
  	getCoursesComplete(id : string){
  		return this.http.get<Course>(`${this.URL}/api/course/course-list/?id=${id}`);
  	}

    //regresa un curso de un usuario
    getCourse(id : string){
      return this.http.get<Course>(`${this.URL}/api/courses/${id}`);
    }

  	//agrega un curso a un usuario
  	addCourse( cv_id: string, name: string, hours: string, institution: string, mode: string, start: string, end: string) {
	  	const data = { cv_id, name, hours, institution, mode, start, end };
		  return this.http.post<Course>(`${this.URL}/api/courses`, data)
    }

    //actualiza un curso
    updateCourse( id: string, name: string, hours: string, institution: string, mode: string, start: string, end: string) {
      const data = { name, hours, institution, mode, start, end };
      return this.http.put<Course>(`${this.URL}/api/courses/${id}`, data)
    }

    //elimina un curso 
    deleteCourse(id : string){
      return this.http.delete<Course>(`${this.URL}/api/courses/${id}`);
    }  


}
