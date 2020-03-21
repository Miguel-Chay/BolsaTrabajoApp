import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import {  NavController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

  constructor(private alertController: AlertController, private navCtrl: NavController) { }

  async alertaInformativa(message: string) {
    const alert = await this.alertController.create({
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

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


}