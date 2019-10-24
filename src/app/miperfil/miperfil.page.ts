import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
//import { IonSegment } from '@ionic/angular';
//import { ActionSheetController } from '@ionic/angular';


@Component({
  selector: 'app-miperfil',
  templateUrl: './miperfil.page.html',
  styleUrls: ['./miperfil.page.scss'],
})
export class MiperfilPage implements OnInit {

  //@ViewChild(IonSegment) segment:IonSegment;

  constructor(public alertController: AlertController) {}

 
async EliminarAptitud() {
    const alert = await this.alertController.create({
      header: 'Eliminar',
      message: '¿Desea eliminar esta actitud?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Eliminar',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }

async agregarAptitud() {
    const alert = await this.alertController.create({
      header: 'Agregar aptitud',
      inputs: [
        {
          name: 'aptitud',
          type: 'text',
          placeholder: 'ejemplo: trabajo en equipo'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }

  ngOnInit() {
  //	this.segment.value='Experiencia laboral';

  }

}
