import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../interfaces/interfaces';
import { Storage } from '@ionic/storage';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  token: string = null;
  id: string = null;
  constructor(private http: HttpClient, private storage: Storage) { }

  login(username: string, password: string) {
    const data = {username, password};

    return new Promise(resolve => {
      this.http.post(`http://localhost:8080/user/login`, data)
      .subscribe(resp => {
        console.log(resp);

        if (resp['login'] ) {
          this.guardarToken(resp['token']);
          resolve(true);
          this.guardarId(resp['id']);
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
  }
}
