import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-olvido-contrasenia',
  templateUrl: './olvido-contrasenia.page.html',
  styleUrls: ['./olvido-contrasenia.page.scss'],
})
export class OlvidoContraseniaPage implements OnInit {

  constructor(public alertController: AlertController) { }


  async contraseniaEnviada(){
  	const alert = await this.alertController.create(
  		{
  			header: 'Contraseña enviada',
	  		message: 'Se ha enviado la contraseña a su correo electronico',
  			buttons: ['Cerrar']
  		}
  	);

  	await alert.present();
  	let result = await alert.onDidDismiss();
  	console.log(result);


  }

  ngOnInit() {
  }

}
