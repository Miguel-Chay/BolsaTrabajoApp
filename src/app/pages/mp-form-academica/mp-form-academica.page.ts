import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EducationService } from 'src/app/services/education.service';
import { AcademicTraining } from '../../interfaces/interfaces';
import { Storage } from '@ionic/storage';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { ActionSheetController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-mp-form-academica',
  templateUrl: './mp-form-academica.page.html',
  styleUrls: ['./mp-form-academica.page.scss'],
})
export class MpFormAcademicaPage implements OnInit {
  academicTraining: AcademicTraining[];
  confirm: string;
  hidetabs: boolean;
  constructor(private educationService: EducationService, private storage: Storage, private actionSheetCtrl: ActionSheetController,
              private navCtrl: NavController, private uiService: UiServiceService ) { this.hidetabs = false }

  ngOnInit() {
    this.storage.get('id').then((id) => {

      this.educationService.getEducation(id).subscribe(academicTraining => {
        this.academicTraining = academicTraining;
        console.log(academicTraining);
      });

    });
  }

  async presentActionSheet(page: string) {
    // el await espera a que se cree el action-Sheet
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones',
      backdropDismiss: false, // es para que no desaparezca el action-sheet cuando presionamos fuera
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        cssClass: 'rojo', // es una clase personalizada en global.scss
        icon: 'trash',
        handler: () => { // funcion que se dispara cuando se hace click
          console.log('Delete clicked');
        }
      }, {
        text: 'editar',
        icon: 'Create',
        handler: () => {
          this.navCtrl.navigateForward('/agregar-form-academica');
          console.log('Share clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    // una vez creada ya se puede mostrar
    await actionSheet.present();
  }

  async opcionesformAcademic(id: string) {
    this.confirm = await this.uiService.opcionesMiperfil(`/mi-perfil/mp-form-academica/form-academica/${id}/editar`) //manda la ruta mas el parametro id 
    if(this.confirm== "delete"){
      // this.workexperienceService.deleteWorkExperience(id).subscribe(Response => {this.ionViewWillEnter()});
    }
   }

  hideTabsfunc() {
    this.hidetabs = true;
  }
}



