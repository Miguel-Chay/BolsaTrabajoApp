import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import {  NavController,ActionSheetController } from '@ionic/angular';

import {Platform,LoadingController} from '@ionic/angular'

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

  constructor(private alertController: AlertController, private navCtrl: NavController,
   public actionSheetController: ActionSheetController,public platform : Platform, 
   public loadingController :LoadingController) { }

  async alertaInformativa(message: string) {
    const alert = await this.alertController.create({
      message,
      buttons: ['OK']
    });

    await alert.present();
  }


  //sirve para confirmar el abandonar una ventana
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
          //cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
            resolveFunction(false)
          }
        },{
          text: 'Aceptar',
          //cssClass: 'secondary',
          handler: () => {
            this.navCtrl.navigateRoot(aceptar);
            console.log('Confirm aceptar');
            resolveFunction(true)
          }
        }]
    });

    await alert.present();
    return promise;
  }

  //opciones de de editar o eliminar una 
  async opcionesMiperfil(page :string): Promise<string> {

    let resolveFunction: (confirm: string) => void;
     const promise = new Promise<string>(resolve => {resolveFunction = resolve;});

    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      buttons: [{
        text: 'Eliminar',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          resolveFunction("delete")
        }
      }, {
        text: 'Editar',
        icon: 'Create',
        handler: () => {
          resolveFunction("edit")
          // this.navCtrl.navigateRoot(page);
          this.navCtrl.navigateForward(page);// cambia de pagina con un parametro id
        }
      },{
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          resolveFunction("cancel");
        }
      }]
    });
    await actionSheet.present();
    return promise;
  } 





  //sirve para informar y al presionar aceptar envia a otra pagina
  async alertaLeave(message: string, aceptar: string): Promise<boolean> {
    let resolveFunction: (confirm: boolean) => void;
    const promise = new Promise<boolean>(resolve => {
    resolveFunction = resolve;
  });

    const alert = await this.alertController.create({
      message,
      buttons: [{
          text: 'Aceptar',
          //cssClass: 'secondary',
          handler: () => {
            this.navCtrl.navigateForward(aceptar);
            console.log('Confirm aceptar');
            resolveFunction(true)
          }
        }]
    });

    await alert.present();
    return promise;
  }
























  loading(message:string,time : number){
    this.platform.ready().then(()=>{
      this.loadingController.create({
        message
      }).then((loadingElement)=>{
        loadingElement.present();
        var ref = this;
        setTimeout(function()
        {
          ref.loadingController.dismiss();
        },time)
      })
    })
  }



}