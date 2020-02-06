import { Component, OnInit, ViewChild  } from '@angular/core';
import { AlertController } from '@ionic/angular'; 
import { ActionSheetController } from '@ionic/angular'; 

@Component({
  selector: 'app-miperfil',
  templateUrl: './miperfil.page.html',
  styleUrls: ['./miperfil.page.scss'],
})

//let expLab: string[] = ['PREDECO S.A. DE C.V.', 'Auxiliar de transporte', '2014-08-01','2015-08-01','Programación de entrada de materia prima desde planta de trituración a planta de fabricación, control y monitoreo de rendimiento de combustible a toda la flotilla, monitoreo de la flotilla de transporte por medio de GPS, registros de mantenimiento de todas las unidades, elaboración de nóminas para pago de choferes y ayudantes.'];
/*class expLab{
    company:string;
    job_tittle:string;
    start:string;
    end:Date;
    description:string;

    constructor(company1:string,job_tittle1:string,start1:string,end1:Date,description1:string)
    {
      this.company=company1;
      this.job_tittle=job_tittle1;
      this.start=start1;
      this.end=end1;
      this.description=description1;
    }
}

let exp= new expLab('PREDECO S.A. DE C.V.', 'Auxiliar de transporte', '2014-08-01','2015-08-01','Programación de entrada de materia prima desde planta de trituración a planta de fabricación, control y monitoreo de rendimiento de combustible a toda la flotilla, monitoreo de la flotilla de transporte por medio de GPS, registros de mantenimiento de todas las unidades, elaboración de nóminas para pago de choferes y ayudantes.')
 */


export class MiperfilPage implements OnInit { 
  public segmento: any[];
  constructor(public alertController: AlertController, public actionSheetController: ActionSheetController) {}
  
async opcionesIdioma() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
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
          this.agregarIdioma();
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
async opcionesExpLab() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
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

  async opcionesFormAcademica() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
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

  async opcionesCursos() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
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
async opcionesCertificaciones() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
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
          this.agregarNivel();
          }
        }
      ]
    });

    await alert.present();
}

async agregarNivel()  {
    const alert = await this.alertController.create({
      header: 'Nivel',
      inputs: [
        {
          name: 'radio11',
          type: 'radio',
          label: 'Basico',
          value: 'value11',
          checked: true
        },
        {
          name: 'radio22',
          type: 'radio',
          label: 'Intermedio',
          value: 'value22'
        },
        {
          name: 'radio33',
          type: 'radio',
          label: 'Avanzado',
          value: 'value33'
        },
        {
          name: 'radio44',
          type: 'radio',
          label: 'Nativo',
          value: 'value44'
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
  }

}
