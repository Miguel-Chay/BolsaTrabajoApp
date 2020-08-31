import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login, User, Candidate } from '../interfaces/interfaces';
import { Storage } from '@ionic/storage';
import { resolve } from 'url';
import { environment } from 'src/environments/environment';
import { CandidateService } from './candidate.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  token: string = null;
  id: string = null;
  user: User;
  URL = environment.url;
  constructor(private http: HttpClient, private storage: Storage, private candidateService: CandidateService ) {
   }


  getUser(id: string) {
    return this.http.get<User>(`${this.URL}/api/users/${id}`);
  }

  login(username: string, password: string) {
    const data = {username, password};

    return new Promise(resolve => {
      this.http.post(`${this.URL}/api/user/login`, data)
      .subscribe(resp => {
        console.log(resp);

        if (resp['login'] ) {
          if (!resp['user'].match('candidate')) {
            resolve('no es candidato');
            return ;
          }
          this.getUser(resp['id']).subscribe( user => {
            this.guardarUsuario(user);
            resolve(true);
           });
          this.candidateService.getCandidate(resp['id']).subscribe(candidate => {
              this.guardarCandidato(candidate);
              resolve(true);
           });
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
  updateUser(id: string, data: any) {
    return new Promise((resolve, reject) => {
      this.http.put(`${this.URL}/api/users/${id}`, data).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
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
  async guardarUsuario(user: User) {
    await this.storage.set('user', JSON.stringify(user));
  }
  async guardarCandidato(candidate: Candidate) {
    await this.storage.set('candidate', JSON.stringify(candidate));
  }
}
