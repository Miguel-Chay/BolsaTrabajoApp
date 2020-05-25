import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Language } from '../interfaces/interfaces';
import { resolve } from 'url';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  	URL = environment.url;
  	constructor(private http: HttpClient) { }


    //http://localhost:8080/api/language/lang-complete/?id=86
    //regresa una lista de los lenguajes de un usuario con el nombre del idioma y el nivel
    getLanguagesComplete(id : string){
      return this.http.get<Language>(`${this.URL}/api/language/lang-complete/?id=${id}`);
    }

    //regresa 1 si el lenguaje existe y 0 en caso contrario
    getLanguageExist(cv_id : string, language:string){
      return this.http.get<Language>(`${this.URL}/api/language/language-exist/?us=${cv_id}&lang=${language}`);
    }

  	//regresa una lista de los lenguajes de un usuario solo con los id del idioma y lenguajes
  	getLanguages(id : string){
  		return this.http.get<Language>(`${this.URL}/api/language/language-list/?id=${id}`);
  	}

    //regresa un lenguaje de un usuario
    getLanguage(id : string){
      return this.http.get<Language>(`${this.URL}/api/languages/${id}`);
    }

  	//agrega un lenguaje a un usuario
  	addLanguage(   cv_id  : string,language_list_id : string,level_list_id : string) {
	  	const data = { cv_id, language_list_id, level_list_id};
		  return this.http.post<Language>(`${this.URL}/api/languages`, data)
    }

    //actualiza un lenguaje
    updateLanguage(id  : string,language_list_id : string,level_list_id : string) {
      const data = { language_list_id, level_list_id };
      return this.http.put<Language>(`${this.URL}/api/languages/${id}`, data)
    }

    //elimina un lenguaje 
    deleteLanguage(id : string){
      return this.http.delete<Language>(`${this.URL}/api/languages/${id}`);
    }  
}
