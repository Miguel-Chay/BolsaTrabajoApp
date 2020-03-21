import { Component, OnInit, ViewChild  } from '@angular/core';
import { AlertController } from '@ionic/angular'; 
import { ActionSheetController } from '@ionic/angular'; 
import { Storage } from '@ionic/storage';

import { WorkExperienceService } from '../../services/work-experience.Service';
import { LineBusinessService } from '../../services/line-business.service';

import { WorkExperience, LineBusiness } from '../../interfaces/interfaces';

@Component({
  selector: 'app-miperfil',
  templateUrl: './miperfil.page.html',
  styleUrls: ['./miperfil.page.scss'],
})

export class MiperfilPage implements OnInit { 
  public segmento: any[];

  val: string = null;

  workexperience: WorkExperience;
  linebusiness : LineBusiness = {}

  constructor(public alertController: AlertController, public actionSheetController: ActionSheetController,
    private workexperienceService : WorkExperienceService, private linebusinessService : LineBusinessService,  
    private storage: Storage) {}


  ngOnInit() { 
    this.storage.get('id').then((val) => { 
      this.workexperienceService.getWorkExperiences (val).subscribe( workexperience=>{this.workexperience=workexperience[0]

        var tam = workexperience[1]
        console.log("tamaño = "+tam)
      
        var lineid :string
        for (var i = 0; i < tam; ++i) {
          lineid=this.workexperience[i].line_business_id

          this.linebusinessService.getLineBusiness(lineid).subscribe( linebusiness=>{ this.linebusiness=linebusiness
            this.workexperience[i].name=linebusiness.name
            console.log(this.workexperience[i].name)
            // console.log(this.linebusiness.name)
            // console.log(this.workexperience[i].name)
          })
          console.log("ciclo "+i)
          console.log(this.workexperience[i].name)
        }

        // this.linebusinessService.getLineBusiness(this.linebusiness[0].line_business_id).subscribe( linebusiness=>{ this.linebusiness=linebusiness
        // console.log(this.linebusiness.name);
        // })


      })
    })

    
  }
  






















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



}
