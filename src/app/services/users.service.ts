import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login, User } from '../interfaces/interfaces';
import { Storage } from '@ionic/storage';
import { resolve } from 'url';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  token: string = null;
  id: string = null;
  URL = environment.url;
  constructor(private http: HttpClient, private storage: Storage) { }


  getUser(id : string){
    return this.http.get<User>(`${this.URL}/api/users/${id}`);
  }


  login(username: string, password: string) {
    const data = {username, password};

    return new Promise(resolve => {
      this.http.post(`${this.URL}/api/user/login`, data)
      .subscribe(resp => {
        console.log(resp);

        if (resp['login'] ) {
          this.guardarToken(resp['token']);
          resolve(true);
          this.guardarId(resp['id']);
          resolve(true);
        } else {
          this.token = null;
          this.storage.clear();
          resolve(false);
        }
      });
    });

  }

  async guardarToken(token: string) {
    this.token = token;
    await this.storage.set('token', token);
  }

  async guardarId(id: string) {
    this.id = id;
    await this.storage.set('id', id);
    console.log(id);
  }
}
