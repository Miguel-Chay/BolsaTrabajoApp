import { Certification } from './../../interfaces/interfaces';
import { CertificationService } from './../../services/certification.service';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { SubjectAreaService } from 'src/app/services/subject-area.service';
import { UiServiceService } from 'src/app/services/ui-service.service';

@Component({
  selector: 'app-mp-certificaciones',
  templateUrl: './mp-certificaciones.page.html',
  styleUrls: ['./mp-certificaciones.page.scss'],
})
export class MpCertificacionesPage implements OnInit {
  certifications: Certification;
  subjectAreas: SubjectAreas;

  // para las opciones de certificaciones
  confirm: string;
  constructor(private certificationService: CertificationService,  private uiService: UiServiceService,
              private storage: Storage, private subjectAreaService: SubjectAreaService) { }

  ngOnInit() {
    this.subjectAreaService.getSubjectAreas().subscribe(subjectAreas => {
      console.log('hola', subjectAreas);
      this.subjectAreas = subjectAreas;
    });
    this.storage.get('id').then(cvId => {
      this.certificationService.getCertifications(cvId).subscribe(certifications => {
        this.certifications = certifications;
        // console.log(this.certifications.subject_area_id);
      });
    });
  }
  ionViewWillEnter() {
    this.storage.get('id').then(cvId => {
      this.certificationService.getCertifications(cvId).subscribe(certifications => {
        this.certifications = certifications;
        // console.log(this.certifications.subject_area_id);
      });
    });
  }
  async opcionesCertifications(id: string) {
    this.confirm = await this.uiService.opcionesMiperfil(`/editar-certificacion/${id}`); // manda la ruta mas el parametro id
    if (this.confirm === 'delete') {

      let reconfirm = await this.uiService.opcionesMiperfilDelete("¿Desea eliminar esta certificación de forma permanente?" )//manda la ruta mas el parametro id 
      if (reconfirm=="delete") {       
        this.certificationService.DeleteCertification(id).subscribe( resp => {
          this.ionViewWillEnter();
        });        
      } 
    }
  }
  doRefresh(event) {
    setTimeout(() => {
      this.storage.get('id').then(cvId => {
        this.certificationService.getCertifications(cvId).subscribe(certifications => {
          this.certifications = certifications;
          // console.log(this.certifications.subject_area_id);
        });
        event.target.complete();
      });
    }, 1500);
  }

}

interface SubjectAreas {
  id?: string;
  cv_id?: string;
  organization?: string;
  name?: string;
  subject_area_id?: string;
  date_received?: string;
  date_expire?: string;
}
