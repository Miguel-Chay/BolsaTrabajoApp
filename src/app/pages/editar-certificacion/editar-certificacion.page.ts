import { Component, OnInit } from '@angular/core';
import { SubjectArea, Certification } from '../../interfaces/interfaces';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SubjectAreaService } from 'src/app/services/subject-area.service';
import { Storage } from '@ionic/storage';
import { CertificationService } from 'src/app/services/certification.service';
import { UiServiceService } from 'src/app/services/ui-service.service';

@Component({
  selector: 'app-editar-certificacion',
  templateUrl: './editar-certificacion.page.html',
  styleUrls: ['./editar-certificacion.page.scss'],
})
export class EditarCertificacionPage implements OnInit {
  idParam: string;
  subjectAreas: SubjectArea;
  createCertication: FormGroup;
  // variables auxiliares para el ion-input date
  DateMin: Date;
  readOnly = true;
  first = false;
  constructor(private route: ActivatedRoute, private subjectAreaService: SubjectAreaService, private storage: Storage,
              private certificationService: CertificationService, private uiService: UiServiceService) {
    this.initForm();
  }

  ngOnInit() {

    this.idParam = this.route.snapshot.paramMap.get('id');
    // console.log(this.idParam);
    this.subjectAreaService.getSubjectAreas().subscribe(subjectAreas => {
      this.subjectAreas = subjectAreas;
    });

    if (this.idParam != null) {
      this.storage.get('id').then(id => {
        this.certificationService.getCertificationByIdCertification(this.idParam).subscribe(certification => {
          this.dataEdit(certification);
        });
      });
    }


  }

  async update() {
    const confirm = await this.uiService.alertaConfirmar('¿Guardar los cambios?', '/mi-perfil/mp-certificaciones');
    if (confirm) {
      this.certificationService.updateCertification(this.idParam, this.createCertication.value).subscribe(() => {});
    }
  }

  dataEdit(certification: Certification) {
    this.createCertication = new FormGroup({
      cv_id: new FormControl(certification.cv_id),
      organization: new FormControl(certification.organization),
      name: new FormControl(certification.name, Validators.required),
      subject_area_id: new FormControl(certification.subject_area_id),
      date_received: new FormControl(certification.date_received),
      date_expire: new FormControl(certification.date_expire),
    });
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
    if (this.first === false) {
      this.first = true;
    } else {
      this.DateMin = $event.target.value;
      dateExpire.value = '';
      this.readOnly = false;
    }
    this.DateMin = $event.target.value;
    this.readOnly = false;
  }
}
