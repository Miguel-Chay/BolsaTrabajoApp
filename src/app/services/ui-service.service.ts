import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import {  NavController, ActionSheetController } from '@ionic/angular';

import {Platform, LoadingController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

  constructor(private alertController: AlertController, private navCtrl: NavController,
              public actionSheetController: ActionSheetController, public platform: Platform,
              public loadingController: LoadingController) { }
 

  // opciones de de editar o eliminar una ___________
  async opcionesMiperfil(page: string): Promise<string> {

    let resolveFunction: (confirm: string) => void;
    const promise = new Promise<string>(resolve => {resolveFunction = resolve; });

    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      buttons: [
       {
        text: 'Editar',
        icon: 'Create',
        handler: () => {
          resolveFunction('edit');
          // this.navCtrl.navigateRoot(page);
          this.navCtrl.navigateForward(page); // cambia de pagina con un parametro id
        }
      },{
        text: 'Eliminar',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          resolveFunction('delete');
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          resolveFunction('cancel');
        }
      }]
    });
    await actionSheet.present();
    return promise;
  }
 

//==================================================
//alerta con un solo boton ok ||sheader=mensaje || type = alert,war,info||
//==================================================

async AlertaOK(sheader:string,type:string, page:string){
  
    let alert = await this.alertController.create({
      header: 'Alerta',
      subHeader: sheader,
      message: `<img src="./assets/alerts/${type}.png" class="card-alert-img">  `,
      mode:"ios",
      // message: 'A ocurrido un error al cargar la pagina',
          cssClass:'alertCancel',
      buttons: [
        {
          text: 'Aceptar',
          cssClass:'alertButton',
          role: 'ok',
          handler: () => {
            if (page!="") { 
              this.navCtrl.navigateRoot(page);
            }
          }
        }
      ]
            // message:"mensaje"
    });
    await alert.present();
    }


//==================================================
//alerta con DOS botones ok-cancel
//==================================================


// sirve para confirmar el abandonar o no una ventana
  async AlertLeaveOKCANCEL(mensaje: string,type:String, aceptar: string): Promise<boolean> {
    let resolveFunction: (confirm: boolean) => void;
    const promise = new Promise<boolean>(resolve => {
    resolveFunction = resolve;
  });

    const alert = await this.alertController.create({
      subHeader:mensaje,
      message: `<img src="./assets/alerts/${type}.png" class="card-alert-img">  `,
      mode:'ios',
      cssClass:'alertCancel',
      buttons: [{
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'alertButton',
          handler: () => {
            console.log('Confirm Cancel');
            resolveFunction(false);
          }
        }, {
          text: 'Aceptar',
          cssClass: 'alertButton',
          handler: () => {
            if (aceptar!="") { 
              this.navCtrl.navigateRoot(aceptar);
            }
            console.log('Confirm aceptar');
            resolveFunction(true);
          }
        }]
    });

    await alert.present();
    return promise;
  }



 

//opcion para confirmar eliminar en mi perfil basico  
  async opcionesMiperfilDelete( mensaje:string): Promise<string> {

    let resolveFunction: (confirm: string) => void;
    const promise = new Promise<string>(resolve => {resolveFunction = resolve; });

    const actionSheet = await this.actionSheetController.create({
      header:  mensaje,
      buttons: [
       {
        text: 'Aceptar',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          resolveFunction('delete');
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          resolveFunction('cancel');
        }
      }]
    });
    await actionSheet.present();
    return promise;
  }






  loading(message: string, time: number) {
    this.platform.ready().then(() => {
      this.loadingController.create({
        message
      }).then((loadingElement) => {
        loadingElement.present();
        let ref = this;
        setTimeout(function() {
          ref.loadingController.dismiss();
        }, time);
      });
    });
  }



}
