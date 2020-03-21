import { Component, OnInit } from '@angular/core';
import { Candidate, User } from '../../interfaces/interfaces';
import { CandidateService } from '../../services/candidate.service';
import { UsersService } from '../../services/users.service';
import { Storage } from '@ionic/storage';
import {FormGroup, FormControl, Validators  } from '@angular/forms';

@Component({
  selector: 'app-editar-perfil-basico',
  templateUrl: './editar-perfil-basico.page.html',
  styleUrls: ['./editar-perfil-basico.page.scss'],
})
export class EditarPerfilBasicoPage implements OnInit {

  candidate: Candidate = {};
  user: User = {};
  updateData: FormGroup;

  constructor(private candidateService: CandidateService, private userService: UsersService, private storage: Storage) {

  }

  ngOnInit() {
    this.storage.get('id').then((val) => {
      this.candidateService.getCandidate(val).subscribe(candidato => {
        this.candidate = candidato;
        });
      this.userService.getUser(val).subscribe(user => {
        this.user = user;
      });

    });
    this.updateData = new FormGroup(  {
      username: new FormControl(this.user.username, [Validators.required, Validators.minLength(4), Validators.maxLength(128), Validators.pattern('[a-zA-Z.-]+[a-zA-Z]')] ),
      email: new FormControl(this.user.email, [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$') ]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      repeatPassword: new FormControl(),

      firstname: new FormControl(Validators.required),
      lastname: new FormControl(Validators.required),
      sex: new FormControl(Validators.required),
      birth_date: new FormControl(Validators.required),
      marital_status: new FormControl(Validators.required),
      phone: new FormControl(Validators.required),
      cellphone: new FormControl(Validators.required),
      city_id: new FormControl(Validators.required),
      curp: new FormControl(Validators.required),
      student_id_number: new FormControl(Validators.required),
      organization_unit_id: new FormControl(Validators.required),
    });

    this.updateData.controls.repeatPassword.setValidators([
      Validators.required, this.passwordid.bind(this.updateData)
    ]);
  }

  ionViewWillEnter() {

  }
  llenarForm() {
  }
  update() {
    console.log(this.updateData.value);
  }

  // es para comparar contraseñas
  passwordid(control: FormControl): {[s: string]: boolean} {

    const forma: any = this;
    if (control.value !== forma.controls.password.value) {
        return{
          noiguales: true
        };
      }
    return null;


  }



}
