import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EducationService } from 'src/app/services/education.service';
import { OrganizationUnit, Degree, StudyPrograme, StatusEducation, SubjectArea, Education } from '../../interfaces/interfaces';
import { SubjectAreaService } from '../../services/subject-area.service';
import { OrganizationUnitService } from '../../services/organization-unit.service';
import { DegreeService } from '../../services/degree.service';
import { StudyProgrammeService } from '../../services/study-programme.service';
import { StatusEducationService } from '../../services/status-education.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { isNumber } from 'util';
import { AlertController } from '@ionic/angular';
import { UiServiceService } from '../../services/ui-service.service';

@Component({
  selector: 'app-form-academica',
  templateUrl: './form-academica.page.html',
  styleUrls: ['./form-academica.page.scss'],
})
export class FormAcademicaPage implements OnInit {
   // auxiliares
   isUpdate = false;
   checkedUady = false;
   checkedOtro = false;
   aux: string;
   PickerOptionsDateStart;
   PickerOptionsDateEnd;
   startYear;
   endYear;
   statEducation: number;
  idParam: string;
  confirm: string;
   // Objetos necesarios para llenar el formulario
   degrees: Degree;
   organizationUnit: OrganizationUnit;
   studyProgrammes: StudyPrograme;
   statusEducations: StatusEducation;
   subjectAreas: SubjectArea;
    // objeto para crear e inyectar en la bd -- tambien para llenar el form del html
  createEducation: FormGroup;

  constructor(private route: ActivatedRoute, private educationService: EducationService,
              private studyProgrammeService: StudyProgrammeService, private storage: Storage,
              private degreeService: DegreeService, private statusEducationService: StatusEducationService,
              private organizationUnitService: OrganizationUnitService, private uiService: UiServiceService,
              private subjectAreaService: SubjectAreaService, private alertCtrl: AlertController) {
                this.initForm(); // inicializa el formgroup
              }

  ngOnInit() {
    this.idParam = this.route.snapshot.paramMap.get('id');
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

    // ==================================================================================================

    this.storage.get('id').then(idCandidate => {
      if ( this.idParam != null) {
        this.isUpdate = true;
      // ============= datos para la opcion Editar =======================
        // consulta la tabala education y regresa los datos de acuerdo al id
        this.educationService.getEducationById(this.idParam).subscribe(education => {
          // en caso que no sea egresado de la uady
          if (education.study_programme_id === null) {

            this.checkedUady = false;
            this.checkedOtro = true;
            this.dataEdit('2', education, null);
            console.log(this.createEducation.value);
          } else {
            this.checkedUady = true;
            this.checkedOtro = false;
            this.studyProgrammeService.getStufyProgramme(education.study_programme_id).subscribe(studyProgramme => {
              this.dataEdit('1', education, studyProgramme.organization_unit_id);
              this.studyProgrammeService.getStudyProgrammeByOrgDegree( studyProgramme.organization_unit_id , education.degree_id).subscribe(studyProgrammes => {
                console.log('entra');
                this.studyProgrammes = studyProgrammes;

              });
              console.log(this.createEducation.value);
            });
          }
        });
      } else {
      // =========== Datos para la opcion Agregar ==============
        this.dataAddEducation(idCandidate);
      }
        // validaciones para las fechas
      this.validateDatePicker();
    });
  }


  clickbox(x: number): void {
    // si 1 es de la UADY
    if (x === 1) {
      this.checkedUady = true;
      this.checkedOtro = false;
      // this.checked = true;
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
      this.createEducation.controls.institution_name.setValue(null);
      this.createEducation.controls.study_programme_name.setValue(null);
      this.createEducation.controls.subject_area_id.setValue(null);
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
      this.checkedUady = false;
      this.checkedOtro = true;
      // limpia los datos inecesarios
      this.createEducation.controls.organization_unit_id.setValue(null);
      this.createEducation.controls.study_programme_id.setValue(null);
    }
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
    if (this.isUpdate) {
      this.educationService.updateCandidate(this.idParam, this.createEducation.value).subscribe(() => {});
    } else {
      this.educationService.createEducation(this.createEducation.value).subscribe(() => {});
    }
  }
  // status education -- se utiliza para mostrar u ocultar la fecha final. en caso de que sea uno se muestra la fecha de finalizacion en el html
  statusEducation($event) {
    this.statEducation = $event.target.value;
    if (this.statEducation.toString().match('1')) {
        this.createEducation.controls.year_end.setValidators([
          Validators.required, this.comparaDate.bind(this.createEducation)
        ]);
        this.createEducation.controls.year_end.setValue('2020');
        this.createEducation.controls.month_end.setValue('01');
    } else {
      this.createEducation.controls.year_end.clearValidators();
      this.createEducation.controls.year_end.updateValueAndValidity();
      this.createEducation.controls.year_end.setValue(null);
      this.createEducation.controls.month_end.setValue(null);
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

  dataEdit(institution: string, education: Education, organizationunitid: string) {
    const dateStartAux = education.start.split('-');
    let dateEndAux: string[] = [, , ];
    if (education.end) {
      dateEndAux = education.end.split('');
    }

    this.createEducation = new FormGroup({
      institution: new FormControl(institution, Validators.required),
      cv_id: new FormControl(education.cv_id),
      degree_id: new FormControl(education.degree_id, Validators.required),
      institution_name: new FormControl(education.institution_name),
      study_programme_id: new FormControl(education.study_programme_id),
      study_programme_name: new FormControl(education.study_programme_name),
      subject_area_id: new FormControl(education.subject_area_id),
      status_education_id: new FormControl(education.status_education_id, Validators.required),
      month_start: new FormControl(dateStartAux[1], Validators.required),
      year_start: new FormControl(dateStartAux[0], Validators.required),
      month_end: new FormControl(dateEndAux[1]),
      year_end: new FormControl(dateEndAux[0]),
      organization_unit_id: new FormControl(organizationunitid),
    });
    this.createEducation.controls.year_start.setValidators([
      Validators.required, this.comparaDate2.bind(this.createEducation)
    ]);

    this.startYear =  this.createEducation.controls.year_start.value;
    this.endYear =  this.createEducation.controls.year_end.value;
  }
  recargar( event ) {

  }
  dataAddEducation(idCandidate: string) {
      // se hacen las validaciones iniciales para el formulario
      this.createEducation = new FormGroup({
        institution: new FormControl('', Validators.required),
        cv_id: new FormControl(idCandidate),
        degree_id: new FormControl('', Validators.required),
        institution_name: new FormControl(),
        study_programme_id: new FormControl(),
        study_programme_name: new FormControl(),
        subject_area_id: new FormControl(),
        status_education_id: new FormControl('', Validators.required),
        month_start: new FormControl('01', Validators.required),
        year_start: new FormControl('2020', Validators.required),
        month_end: new FormControl('01'),
        year_end: new FormControl('2020'),
        organization_unit_id: new FormControl(),
      });

      this.createEducation.controls.year_start.setValidators([
        Validators.required, this.comparaDate2.bind(this.createEducation)
      ]);

      this.startYear =  this.createEducation.controls.year_start.value;
      this.endYear =  this.createEducation.controls.year_end.value;
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

    if (control.value > forma.controls.year_end.value && forma.controls.year_end.value !== null ) {
      return{
        invalid: true
      };
    }
    return null;
  }

  validateDatePicker() {
    // ======== Se capturan los datos para la fecha ========= //
      // guarda la fecha de inicio
      this.PickerOptionsDateStart = {
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
                this.presentAlert('El año de finalización debe ser mayor que el de inicio.');
              } else {
                console.log('entra anio');
                // this.createEducation.controls.year_end.clearValidators();
                this.createEducation.controls.year_end.updateValueAndValidity();
              }
            }
          },
        }]
      };
        // guarda la fecha final
      this.PickerOptionsDateEnd = {
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
          },
        }]
      };
  }

}
