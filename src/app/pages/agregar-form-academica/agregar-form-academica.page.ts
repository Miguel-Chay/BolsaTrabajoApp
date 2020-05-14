import { Component, OnInit } from '@angular/core';
import { StudyProgrammeService } from 'src/app/services/study-programme.service';
import { Storage } from '@ionic/storage';
import { EducationService } from 'src/app/services/education.service';
import { Education, Degree, OrganizationUnit, StudyPrograme, StatusEducation, SubjectArea } from 'src/app/interfaces/interfaces';
import { DegreeService } from 'src/app/services/degree.service';
import { OrganizationUnitService } from 'src/app/services/organization-unit.service';
import { StatusEducationService } from 'src/app/services/status-education.service';
import {FormGroup, FormControl, Validators, Form  } from '@angular/forms';
import { SubjectAreaService } from 'src/app/services/subject-area.service';
import { AlertController } from '@ionic/angular';
import { isNumber } from 'util';

@Component({
  selector: 'app-agregar-form-academica',
  templateUrl: './agregar-form-academica.page.html',
  styleUrls: ['./agregar-form-academica.page.scss'],
})
export class AgregarFormAcademicaPage implements OnInit {

  checked = false;
  // auxiliares
  aux: string;
  customPickerOptions;
  customPickerOptions2;
  startYear;
  endYear;
  statEducation: number;
  // Objetos necesarios para llenar el formulario
  degrees: Degree;
  organizationUnit: OrganizationUnit;
  studyProgrammes: StudyPrograme;
  statusEducations: StatusEducation;
  subjectAreas: SubjectArea;
  // objeto para crear e inyectar en la bd -- tambien para llenar el form del html
  createEducation: FormGroup;

  constructor(private studyProgrammeService: StudyProgrammeService, private storage: Storage,
              private educationService: EducationService, private degreeService: DegreeService,
              private organizationUnitService: OrganizationUnitService, private statusEducationService: StatusEducationService,
              private subjectAreaService: SubjectAreaService, private alertCtrl: AlertController) {

                this.initForm(); // inicializa el formgroup
               }

  ngOnInit() {

    // ======== Servicios para llenar los objetos ========= //
      // llena el objeto degrees con todos los degrees - tabla degree
    this.degreeService.getDegres().subscribe( degrees => {
      this.degrees = degrees;
    });
      // llena el objeto organizationUnit con todas las facultades de la UADY - consulta tabla organization_unit
    this.organizationUnitService.getOrganizationUnits().subscribe(orgUnit => {
      this.organizationUnit = orgUnit;
    });
      // llena el objeto statusEducations con los tipos que hay en la bd - consulta tabla status_educations
    this.statusEducationService.getStatusEducations().subscribe(statusEducations => {
      this.statusEducations = statusEducations;
    });
      // llena el objeto subjectAreas  - consulta tabla subject_area
    this.subjectAreaService.getSubjectAreas().subscribe(subjectAreas => {
      this.subjectAreas = subjectAreas;
    });
    /*
      Grado de estudio: degree
      === caso de ser Uady ===
      Dependencia: organization_unit
      plan de estudion: study_programme
      Estado: status_Education
      de: degree
      hasta: degree
      en la tabla degree solo hay que ocupar el atributo: study_programme_id
      ==Caso de ser otro ===
      Nombre del istituto: degree->institution_name
      Nombre del plan de estudios: degree-> study_programe_name
      Area_de_Estudio: subject_area

    */
    // ======== Se capturan los datos para llenar el formulario ========= //
    this.storage.get('id').then(id => {

      // se hacen las validaciones iniciales para el formulario
      this.createEducation = new FormGroup({
        institution: new FormControl(Validators.required),
        cv_id: new FormControl(id),
        degree_id: new FormControl('', Validators.required),
        institution_name: new FormControl(''),
        study_programme_id: new FormControl(''),
        study_programme_name: new FormControl(),
        subject_area_id: new FormControl(''),
        status_education_id: new FormControl('', Validators.required),
        month_start: new FormControl('01', Validators.required),
        year_start: new FormControl('2020', Validators.required),
        month_end: new FormControl('01'),
        year_end: new FormControl('2020'),
        organization_unit_id: new FormControl(''),
      });
      // validacion para comparar fecha de inicio y fin
      // this.createEducation.controls.year_end.setValidators([
      //   Validators.required, this.comparaDate.bind(this.createEducation)
      // ]);
      // this.createEducation.controls.year_start.setValidators([
      //   Validators.required, this.comparaDate2.bind(this.createEducation)
      // ]);
      this.createEducation.controls.year_start.setValidators([
        Validators.required, this.comparaDate2.bind(this.createEducation)
      ]);
      this.startYear =  this.createEducation.controls.year_start.value;
      this.endYear =  this.createEducation.controls.year_end.value;
    });

    // ======== Se capturan los datos para la fecha ========= //
      // guarda la fecha de inicio
    this.customPickerOptions = {
      backdropDismiss: false,
      buttons: [{
        text: 'Guardar',
        handler: (evento) => {
          if (evento.month) {
            this.createEducation.controls.month_start.setValue(evento.month.value.toString());
          }
          if (evento.year) {
            this.createEducation.controls.year_start.setValue(evento.year.value.toString());
            this.startYear = evento.year.value;
            if (this.startYear > this.endYear && this.statEducation.toString().match('1')) {
              console.log('esta mal');
              this.presentAlert('El año de finalización debe ser mayor que el de inicio.');
            } else {
              console.log('entra anio');
              this.createEducation.controls.year_end.updateValueAndValidity();
            }
          }
          // console.log(evento);
          console.log(evento);
        },
      }]
    };
      // guarda la fecha final
    this.customPickerOptions2 = {
      backdropDismiss: false,
      buttons: [{
        text: 'Guardar',
        handler: (evento) => {
          if (evento.month) {
            this.createEducation.controls.month_end.setValue(evento.month.value.toString());
          }
          if (evento.year) {
            this.createEducation.controls.year_end.setValue(evento.year.value.toString());
            this.endYear = evento.year.value;
            if (this.startYear > this.endYear && this.statEducation.toString().match('1') ) {
              this.presentAlert('El año de finalización debe ser mayor que el de inicio.');
            } else {
              this.createEducation.controls.year_start.updateValueAndValidity();
            }
          }
          // console.log(evento);
          console.log(evento);
        },
      }]
    };
  }
  // para comprobar si es mayor o igual
  comparaDate(control: FormControl): {[s: string]: boolean} {

    const forma: any = this;
    // si es uno, la validacion lo tiene la fecha final
    if (control.value < forma.controls.year_start.value) {
      return{
        invalid: true
      };
    }
    return null;
  }
  comparaDate2(control: FormControl): {[s: string]: boolean} {

    const forma: any = this;

    if (control.value > forma.controls.year_end.value && forma.controls.year_end.value !== '' ) {
      return{
        invalid: true
      };
    }
    return null;
  }
  clickbox(x: number): void {
    // si 1 es de la UADY
    if (x === 1) {
      this.checked = true;
      this.createEducation.controls.institution.setValue(x);
      this.createEducation.controls.study_programme_id.setValidators([Validators.required]);
      this.createEducation.controls.organization_unit_id.setValidators([Validators.required]);


      this.createEducation.controls.study_programme_name.clearValidators();
      this.createEducation.controls.subject_area_id.clearValidators();
      this.createEducation.controls.institution_name.clearValidators();
      this.createEducation.controls.study_programme_name.updateValueAndValidity();
      this.createEducation.controls.subject_area_id.updateValueAndValidity();
      this.createEducation.controls.institution_name.updateValueAndValidity();

      // se limpia los datos innecesarios
      this.createEducation.controls.institution_name.setValue('');
      this.createEducation.controls.study_programme_name.setValue('');
      this.createEducation.controls.subject_area_id.setValue('');
      console.log(this.createEducation.controls);
    } else {
      // en caso de que sea de otra institucion
      this.createEducation.controls.institution.setValue(x);
      this.createEducation.controls.study_programme_name.setValidators(Validators.required);
      this.createEducation.controls.subject_area_id.setValidators(Validators.required);
      this.createEducation.controls.institution_name.setValidators(Validators.required);

      // desabilita las validaciones requeridas no necesarias
      this.createEducation.controls.study_programme_id.clearValidators();
      this.createEducation.controls.organization_unit_id.clearValidators();
      this.createEducation.controls.study_programme_id.updateValueAndValidity();
      this.createEducation.controls.organization_unit_id.updateValueAndValidity();
      this.checked = false;
      console.log('si vers');
      console.log(this.createEducation.controls);

      // limpia los datos inecesarios
      this.createEducation.controls.organization_unit_id.setValue('');
      this.createEducation.controls.study_programme_id.setValue('');
    }
    console.log(x);
    console.log('checked: ' + this.checked); // it is working !!!
  }

  // Funciones que se lanzan cuando hay un cambio en el ion-select de grado de estudio
  orgUnit($event, tipo: boolean,  select?: string) {
    if (tipo) {
      this.studyProgrammeService.getStudyProgrammeByOrgDegree( this.aux , $event.target.value).subscribe(studyProgrammes => {
        this.studyProgrammes = studyProgrammes;
      });
    } else {
      this.studyProgrammeService.getStudyProgrammeByOrgDegree($event.target.value, select).subscribe(studyProgrammes => {
        this.aux = $event.target.value;
        this.studyProgrammes = studyProgrammes;
      });
    }
  }
  update() {
    console.log(this.createEducation.value);
    console.log(this.createEducation.controls);
    console.log(this.createEducation.valid);
    const x = + this.createEducation.controls.year_start.value;
    console.log('si', isNumber(x) );
  }
  // status education -- se utiliza para mostrar u ocultar la fecha final. en caso de que sea uno se muestra la fecha de finalizacion en el html
  statusEducation($event) {
    this.statEducation = $event.target.value;
    if (this.statEducation.toString().match('1')) {
        console.log('entra');
        this.createEducation.controls.year_end.setValidators([
          Validators.required, this.comparaDate.bind(this.createEducation)
        ]);
        this.createEducation.controls.year_end.setValue('2020');
        this.createEducation.controls.month_end.setValue('01');
    } else {
      this.createEducation.controls.year_end.setValue('');
      this.createEducation.controls.month_end.setValue('');
    }
  }
  // alert
  async presentAlert(mensaje: string) {
    const alert = await this.alertCtrl.create({
      subHeader: 'Fecha incorrecta',
      message: mensaje,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        },
        {
          text: 'ok',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Boton ok');
          }
        }
      ]
    });

    await alert.present();
  }

   // iniciliza el formGroup
   initForm() {
    this.createEducation = new FormGroup(  {
      institution: new FormControl(),
      cv_id: new FormControl(),
      degree_id: new FormControl(),
      institution_name: new FormControl(),
      study_programme_id: new FormControl(),
      study_programme_name: new FormControl(),
      subject_area_id: new FormControl(),
      status_education_id: new FormControl(),
      month_start: new FormControl(),
      year_start: new FormControl(),
      month_end: new FormControl(),
      year_end: new FormControl(),
      organization_unit_id: new FormControl(),
    });
  }
}

interface EducationInterface {
  institution?: string;
  cv_id?: string;
  degree_id?: string;
  institution_name?: string;
  study_programme_id?: string;
  study_programme_name?: string;
  subject_area_id?: string;
  status_education_id?: string;
  month_start?: string;
  year_start?: string;
  month_end?: string;
  year_end?: string;
  organization_unit_id?: string;
}
