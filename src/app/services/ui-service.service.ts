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

  async alertaInformativa(message: string) {
    const alert = await this.alertController.create({
      message,
      buttons: ['OK']
    });

    await alert.present();
  }


  // sirve para confirmar el abandonar una ventana
  async alertaConfirmar(message: string, aceptar: string): Promise<boolean> {
    let resolveFunction: (confirm: boolean) => void;
    const promise = new Promise<boolean>(resolve => {
    resolveFunction = resolve;
  });

    const alert = await this.alertController.create({
      message,
      buttons: [{
          text: 'Cancelar',
          role: 'cancel',
          // cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
            resolveFunction(false);
          }
        }, {
          text: 'Aceptar',
          // cssClass: 'secondary',
          handler: () => {
            this.navCtrl.navigateRoot(aceptar);
            console.log('Confirm aceptar');
            resolveFunction(true);
          }
        }]
    });

    await alert.present();
    return promise;
  }

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

  //funcion especial para opciones de aptitudes
  async opcionesMiperfilAptitud(page: string): Promise<string> {

    let resolveFunction: (confirm: string) => void;
    const promise = new Promise<string>(resolve => {resolveFunction = resolve; });

    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      buttons: [
       {
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






  // sirve para informar y al presionar aceptar envia a otra pagina
  async alertaLeave(message: string, aceptar: string): Promise<boolean> {
    let resolveFunction: (confirm: boolean) => void;
    const promise = new Promise<boolean>(resolve => {
    resolveFunction = resolve;
  });

    const alert = await this.alertController.create({
      message,
      mode:'ios',
      // cssClass: 'alertCancel',

      buttons: [{
          text: 'Aceptar',
          // cssClass: 'secondary',
          handler: () => {
            this.navCtrl.navigateForward(aceptar);
            console.log('Confirm aceptar');
            resolveFunction(true);
          }
        }]
    });

    await alert.present();
    return promise;
  }


 // sirve para MOSTRAR ERROR DE CONECCION y al presionar aceptar envia a otra pagina
  async HttpErrorResponse(message: string, aceptar: string): Promise<boolean> {
    let resolveFunction: (confirm: boolean) => void;
    const promise = new Promise<boolean>(resolve => {
    resolveFunction = resolve;
  });

    const alert = await this.alertController.create({
      message,
      mode:'ios',
      cssClass: 'alertCancel',

      buttons: [{
          text: 'Aceptar',
          // cssClass: 'secondary',
          cssClass: 'alertButton',
          handler: () => {
            this.navCtrl.navigateForward(aceptar);
            console.log('Confirm aceptar');
            resolveFunction(true);
          }
        }]
    });

    await alert.present();
    return promise;
  }




async edit_avatar(){
    let alert = await this.alertController.create({
      header: 'Alerta',
      subHeader: 'error de conección',
      message: 'A ocurrido un error al cargar la pagina',
          // cssClass:'avatar_alert_camera_btn',
      mode:'md',
      buttons: [
        {
          text: '                               ',
          cssClass:'avatar_alert_camera_btn',
          role: 'ok',
          handler: () => {
          }
        },{
          text: ' ',
          cssClass:'disabled',
          role: 'ok',
          handler: () => {
          }
        },
        {
          text: 'Aceptar',
          // cssClass:'avatar_alert_gallery_btn',
          role: 'ok',
          handler: () => {
          }
        }
      ]

            // message:"mensaje"
    });
    await alert.present();
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
