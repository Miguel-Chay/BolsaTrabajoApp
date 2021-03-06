import { Component, OnInit } from '@angular/core';
import { Candidate, User, Country, City, State, OrganizationUnit } from '../../interfaces/interfaces';
import { CandidateService } from '../../services/candidate.service';
import { UsersService } from '../../services/users.service';
import { Storage } from '@ionic/storage';
import {FormGroup, FormControl, Validators  } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { CityService } from '../../services/city.service';
import { StateService } from '../../services/state.service';
import { OrganizationUnitService } from 'src/app/services/organization-unit.service';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../../components/popover/popover.component';
import * as moment from 'moment';
@Component({
  selector: 'app-editar-perfil-basico',
  templateUrl: './editar-perfil-basico.page.html',
  styleUrls: ['./editar-perfil-basico.page.scss'],
})
export class EditarPerfilBasicoPage implements OnInit {
   // Datos necesarios

   candidate: Candidate = {};
   user: User;
   countries: Country;
   cities: City;
   states: State;
   organizationUnit: OrganizationUnit;
   countryId = '';
   cityId: string;
   stateId: string;
   // --------------------
   updateData: FormGroup;
   // ----------------------

   // ----- Variables para los errores
    userNameminlength = false;
    userNamePattern = false;
    first = false;
    firstSate = false;

  constructor(private storage: Storage, private countryService: CountryService, private cityService: CityService, private stateService: StateService,
              private organizationUnitService: OrganizationUnitService, private userService: UsersService,
              private candidateService: CandidateService, private popoverCtrl: PopoverController ) {
     this.initForm();

  }

  ngOnInit() {
    // ----- Esta seccion es para inicializar la lista de pais estado y ciudad
    this.organizationUnitService.getOrganizationUnits().subscribe(organizationUnit => {
      this.organizationUnit = organizationUnit;
    });
    this.countryService.getCountries().subscribe(countries => {
      this.countries = countries;
    });
    this.cityService.getCities().subscribe(cities => {
      this.cities = cities;
    });

    // ---------- inicializa  el objeto candidate para llenar el formulario
    this.storage.get('candidate').then(candidate => {
      this.candidate = JSON.parse(candidate);

      this.cityService.getCity(this.candidate.city_id).subscribe(city => {
        this.stateId = city.state_id;
        this.storage.set('state_id', this.stateId);
        this.cityId = this.candidate.city_id;
        this.stateService.getState(city.state_id).subscribe(state => {
            this.countryId = state.country_id;

            // paraa inicializar el objeto del estado y ciudad
            this.stateService.getStateByCountry(this.countryId).subscribe(states => {
              this.states = states[0];
            });
            this.cityService.getCitiesByState(this.stateId).subscribe(cities => {
              this.cities = cities[0];
            });
            this.storage.get('user').then( user => {
              this.user = JSON.parse(user);
              this.dataEdit();
            });
        });
      });
    });

  }

  // *********************************************
    // es para comparar contraseñas
  passwordid(control: FormControl): {[s: string]: boolean} {

    const forma: any = this;
    if (control.value !== forma.controls.userData.controls.password.value) {
        return{
          noiguales: true
        };
      }
    return null;
  }

  //  esta funcion se usa para hacer los cambios en la bd
  update() {
    const dat =  moment(this.updateData.controls.birth_date.value).format('YYYY-MM-DD');
    this.updateData.controls.birth_date.setValue(dat);
    this.userService.updateUser(this.user.id, this.updateData.controls.userData.value).then((user) => {
      this.user = user;
      this.userService.guardarUsuario(this.user);
    }, (err) => {
      console.log(err);
    });

    this.candidateService.updateCandidate(this.user.id, this.updateData.value).then( (candidate) => {
      this.candidate = candidate;
      this.userService.guardarCandidato(this.candidate);
    }, (err) => {
      console.log(err, 'hola');
    });

  }
  // dataEdi
  dataEdit() {
    this.updateData = new FormGroup(  {
      userData: new FormGroup({
        username: new FormControl(this.user.username, [Validators.required, Validators.minLength(4), Validators.maxLength(128), Validators.pattern('^(?![-_.])(?!.*[-_.]{2})[a-zA-Z0-9._-]+(?![-_.])$')] ),
        email: new FormControl(this.user.email, [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$') ]),
        password: new FormControl('', [Validators.required, Validators.minLength(6),
                                      Validators.pattern('^(?=^.{7,30}$)((?=.*)(?=.*[A-Z])(?=.*[a-z])|(?=.*)(?=.*[^A-Za-z0-9])(?=.*[a-z])|(?=.*[^A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z])|(?=.*)(?=.*[A-Z])(?=.*[^A-Za-z0-9]))^.*$')]),
        password_confirm:  new FormControl(),
      }),

      firstname: new FormControl(this.candidate.firstname, Validators.required),
      lastname: new FormControl(this.candidate.lastname, Validators.required),
      sex: new FormControl( this.candidate.sex, Validators.required),
      birth_date: new FormControl( this.candidate.birth_date, Validators.required),
      marital_status: new FormControl(this.candidate.marital_status, Validators.required),
      phone: new FormControl(this.candidate.phone),
      cellphone: new FormControl(this.candidate.cellphone),
      city_id: new FormControl(this.candidate.city_id, Validators.required),
      curp: new FormControl(this.candidate.curp),
      student_id_number: new FormControl( this.candidate.student_id_number),
      organization_unit_id: new FormControl( this.candidate.organization_unit_id, Validators.required),
      country_id: new FormControl(this.countryId),
      state_id: new FormControl(this.stateId),
    });
    this.updateData.controls.curp.disable();
    this.updateData.controls.userData.get('password_confirm').setValidators([
      Validators.required, this.passwordid.bind(this.updateData)
    ]);
  }
  // iniciliza el formGroup
  initForm() {
    this.updateData = new FormGroup(  {
      userData: new FormGroup({
        username: new FormControl( ),
        email: new FormControl(),
        password: new FormControl(),
        password_confirm: new FormControl(),
      }),
      firstname: new FormControl(),
      lastname: new FormControl(),
      sex: new FormControl(),
      birth_date: new FormControl(),
      marital_status: new FormControl(),
      phone: new FormControl(),
      cellphone: new FormControl(),
      city_id: new FormControl(),
      curp: new FormControl({value: '', disabled: true}),
      student_id_number: new FormControl({value: '', disabled: true}),
      organization_unit_id: new FormControl(),
      country_id: new FormControl(),
      state_id: new FormControl(),
    });
  }


  // *********************************************
    // Funciones que se lanzan cuando hay un cambio en el ion-select
  onChangeCountry($event) {
    if (this.first === false) {
      this.first = true;
      this.updateData.updateValueAndValidity();
    } else {
      this.updateData.controls.state_id.setValue('');
      this.updateData.controls.city_id.setValue('');
      this.updateData.updateValueAndValidity();
    }
    this.stateService.getStateByCountry($event.target.value).subscribe(states => {
      this.states = states[0];
    });
    this.cities = null;
  }
  onChangeState($event) {
    if (this.firstSate === false) {
      this.firstSate = true;
      this.updateData.updateValueAndValidity();
    } else {
      this.updateData.controls.city_id.setValue('');
      this.updateData.updateValueAndValidity();
    }
    this.cityService.getCitiesByState($event.target.value).subscribe(cities => {
      this.cities = cities[0];
    });
  }


  // Para mostrar dialogos de error en alguna validacion
  advertenciaUserData() {
    if  (this.updateData.controls.userData.get('username').getError('minlength')) {
         this.userNameminlength = true;
    } else {
      this.userNameminlength = false;
    }
    if (this.updateData.controls.userData.get('username').getError('pattern')) {
      this.userNamePattern = true;
    } else {
      this.userNamePattern = false;
    }
  }
  changePassword() {
    this.updateData.controls.userData.get('password_confirm').setValue('');
    this.updateData.controls.userData.get('password_confirm').updateValueAndValidity();
  }
  // async mostrarPop(evento) {
  //   const   popover = await this.popoverCtrl.create({
  //     component: PopoverComponent,
  //     event: evento,
  //     mode: 'ios',
  //     showBackdrop: false
  //   });

  //   await popover.present();
  // }
}
