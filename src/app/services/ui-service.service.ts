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
            // this.navCtrl.navigateForward(aceptar);
            console.log('Confirm aceptar');
            resolveFunction(true);
          }
        }]
    });

    await alert.present();
    return promise;
  }

//==================================================
//alerta con un solo boton ok
//==================================================

async error(text){
    let alert = await this.alertController.create({
      header: 'Alerta',
      subHeader: text,
      message: '<img src="./assets/alerts/alert.png" class="card-alert-img">  ',
      mode:"ios",
      // message: 'A ocurrido un error al cargar la pagina',
          cssClass:'alertCancel',
      buttons: [
        {
          text: 'Aceptar',
          cssClass:'alertButton',
          role: 'ok',
          handler: () => {
          }
        }
      ]
            // message:"mensaje"
    });
    await alert.present();
    }

async warning(text){
    let alert = await this.alertController.create({
      header: 'Alerta',
      subHeader: text,
      message: '<img src="./assets/alerts/war.png" class="card-alert-img">  ',
      mode:"ios",
      // message: 'A ocurrido un error al cargar la pagina',
          cssClass:'alertCancel',
      buttons: [
        {
          text: 'Aceptar',
          cssClass:'alertButton',
          role: 'ok',
          handler: () => {
          }
        }
      ]
            // message:"mensaje"
    });
  await alert.present();
}

async information(text){
  let alert = await this.alertController.create({
    header: 'Alerta',
    subHeader: text,
    message: '<img src="./assets/alerts/info.png" class="card-alert-img">  ',
    mode:"ios",
    // message: 'A ocurrido un error al cargar la pagina',
        cssClass:'alertCancel',
    buttons: [
      {
        text: 'Aceptar',
        cssClass:'alertButton',
        role: 'ok',
        handler: () => {
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
  async warningSALIR(mensaje: string, aceptar: string): Promise<boolean> {
    let resolveFunction: (confirm: boolean) => void;
    const promise = new Promise<boolean>(resolve => {
    resolveFunction = resolve;
  });

    const alert = await this.alertController.create({
      subHeader:mensaje,
      message: '<img src="./assets/alerts/war.png" class="card-alert-img"> ',
      mode:'ios',
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





async presentPrompt() {
  let alert = await this.alertController.create({
    message: 'Login',
     
    buttons: [
      {
        text: 'no',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
          return false
        }
      },
      {
        text: 'ok',
        handler: data => {
            return true;
        }
      }
    ]
  });
  await alert.present();
}

  
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
