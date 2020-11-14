import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { EducationService } from 'src/app/services/education.service';
import { AcademicTraining } from '../../interfaces/interfaces';
import { Storage } from '@ionic/storage';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { ActionSheetController, NavController } from '@ionic/angular';
import { MiPerfilPage } from '../mi-perfil/mi-perfil.page';

@Component({
  selector: 'app-mp-form-academica',
  templateUrl: './mp-form-academica.page.html',
  styleUrls: ['./mp-form-academica.page.scss'],
})
export class MpFormAcademicaPage implements OnInit {
  @Output() alv = new EventEmitter<boolean>();
  academicTraining: AcademicTraining[];
  confirm: string;
  hidetabs: boolean;
  prueba: string;
  constructor(private educationService: EducationService, private storage: Storage, private actionSheetCtrl: ActionSheetController,
              private navCtrl: NavController, private uiService: UiServiceService ) {
                }
  // @ViewChild(MiPerfilPage, {static: false} ) pageForm: MiPerfilPage;

  ngOnInit() {
    this.prueba = 'md refresher-md hydrated refresher-active refresher-refreshing';
    this.storage.get('id').then((id) => {

      this.educationService.getEducation(id).subscribe(academicTraining => {
        this.academicTraining = academicTraining;
        // console.log(academicTraining);
      });

    });
  }
  ionViewWillEnter() {
    this.storage.get('id').then((id) => {

      this.educationService.getEducation(id).subscribe(academicTraining => {
        this.academicTraining = academicTraining;
        // console.log(academicTraining);
      });

    });
  }

  async opcionesformAcademic(id: string) {
    this.confirm = await this.uiService.opcionesMiperfil(`/form-academica/${id}/editar`); // manda la ruta mas el parametro id
    if (this.confirm === 'delete') {     
      let reconfirm = await this.uiService.opcionesMiperfilDelete("¿Desea eliminar esta formación académica de forma permanente?" )//manda la ruta mas el parametro id 
      if (reconfirm=="delete") {       
        this.educationService.DeleteEducation(id).subscribe( resp => {
          this.ionViewWillEnter();
        });  
      }
    }
  }
  doRefresh(event, refresh) {
    console.log(refresh);
    setTimeout(() => {
      this.storage.get('id').then((id) => {

        this.educationService.getEducation(id).subscribe(academicTraining => {
          this.academicTraining = academicTraining;
          // console.log(academicTraining);
        });
        event.target.complete();
      });
    }, 1500);
  }
  hideTabsfunc() {
    // this.pageForm.tabs.tabBar.el.hidden = true;
    // this.pageForm.hidenTabs(true);
  }
}



