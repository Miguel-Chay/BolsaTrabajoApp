import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
//import { IonSegment } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';


@Component({
  selector: 'app-miperfil',
  templateUrl: './miperfil.page.html',
  styleUrls: ['./miperfil.page.scss'],
})
export class MiperfilPage implements OnInit {

  //@ViewChild(IonSegment) segment:IonSegment;

  constructor(public alertController: AlertController, public actionSheetController: ActionSheetController) {}

async opcionesIdioma() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Albums',
      buttons: [{
        text: 'Eliminar',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Editar',
        icon: 'Create',
        handler: () => {
          console.log('Editar clicked');
        }
      },{
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }



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
      header: 'Añadir aptitud',
      inputs: [
        {
          name: 'aptitud',
          type: 'text',
          placeholder: 'Aptitud'
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
          text: 'Crear',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }
 
  /*
async agregarIdioma()  {
    const alert = await this.alertController.create({
      header: 'Idioma',
      inputs: [
        {
          name: 'radio1',
          type: 'radio',
          label: 'Español',
          value: 'value1',
          checked: true
        },
        {
          name: 'radio2',
          type: 'radio',
          label: 'Ingles',
          value: 'value2'
        },
        {
          name: 'radio3',
          type: 'radio',
          label: 'Frances',
          value: 'value3'
        },
        {
          name: 'radio4',
          type: 'radio',
          label: 'Maya',
          value: 'value4'
        }
      ],
      header: 'Nivel',
      inputs: [
        {
          name: 'radio1',
          type: 'radio',
          label: 'Basico',
          value: 'value1',
          checked: true
        },
        {
          name: 'radio2',
          type: 'radio',
          label: 'Intermedio',
          value: 'value2'
        },
        {
          name: 'radio3',
          type: 'radio',
          label: 'Avanzado',
          value: 'value3'
        },
        {
          name: 'radio4',
          type: 'radio',
          label: 'Nativo',
          value: 'value4'
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

*/
  ngOnInit() {
  //	this.segment.value='Experiencia laboral';

  }

}
