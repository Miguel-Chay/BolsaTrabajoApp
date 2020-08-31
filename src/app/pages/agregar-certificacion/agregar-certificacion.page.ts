import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CertificationService } from './../../services/certification.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SubjectAreaService } from 'src/app/services/subject-area.service';
import { SubjectArea } from '../../interfaces/interfaces';
import { Storage } from '@ionic/storage';
import { UiServiceService } from 'src/app/services/ui-service.service';

@Component({
  selector: 'app-agregar-certificacion',
  templateUrl: './agregar-certificacion.page.html',
  styleUrls: ['./agregar-certificacion.page.scss'],
})
export class AgregarCertificacionPage implements OnInit {

  subjectAreas: SubjectArea;
  createCertication: FormGroup;

  // variables auxiliares para el ion-input date
  DateMin: Date;
  readOnly = true;
  constructor(private subjectAreaService: SubjectAreaService, private storage: Storage, private navCtrl: NavController ,
              private uiService: UiServiceService, private certificationService: CertificationService) {
    this.initForm();
   }

  ngOnInit() {

    // llena el objeto con los areas de estudio
    this.subjectAreaService.getSubjectAreas().subscribe(subjectAreas => {
      this.subjectAreas = subjectAreas;
    });

    this.storage.get('id').then(id => {

        this.createCertication = new FormGroup({
          cv_id: new FormControl(id),
          organization: new FormControl(''),
          name: new FormControl('', Validators.required),
          subject_area_id: new FormControl(''),
          date_received: new FormControl(),
          date_expire: new FormControl(),

        });
    });
  }

  async add() {
    const confirm = await this.uiService.alertaConfirmar('¿Añadir nueva certificación?', '/agregar-certificacion');
    if (confirm) {
      this.certificationService.createCertification(this.createCertication.value).subscribe(() => {});
      this.navCtrl.navigateForward('/mi-perfil/mp-certificaciones');
      // console.log(this.createCertication.value);
    }
  }
  initForm() {
    this.createCertication = new FormGroup(  {
      cv_id: new FormControl(),
      organization: new FormControl(),
      name: new FormControl(),
      subject_area_id: new FormControl(),
      date_received: new FormControl(),
      date_expire: new FormControl(),
    });
  }

  minDate($event, dateExpire: any) {
    this.DateMin = $event.target.value;
    dateExpire.value = '';
    this.readOnly = false;
  }
}
