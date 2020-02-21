import { Component, OnInit } from '@angular/core';
import { Candidate, User } from '../../interfaces/interfaces';
import { CandidateService } from '../../services/candidate.service';
import { UsersService } from '../../services/users.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-editar-perfil-basico',
  templateUrl: './editar-perfil-basico.page.html',
  styleUrls: ['./editar-perfil-basico.page.scss'],
})
export class EditarPerfilBasicoPage implements OnInit {

  candidate: Candidate = {};
  user: User = {};
  constructor(private candidateService: CandidateService, private userService: UsersService,
              private storage: Storage) {

  }

  ngOnInit() {
    this.storage.get('id').then((val) => {
      this.candidateService.getCandidate(val).subscribe(candidato => {
        this.candidate = candidato;
        console.log(this.candidate);
        });
      this.userService.getUser(val).subscribe(user => {
        this.user = user;
        console.log(this.user);
      });
    });
  }

}
