import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-inicio-perfil-basico',
  templateUrl: './inicio-perfil-basico.page.html',
  styleUrls: ['./inicio-perfil-basico.page.scss'],
})
export class InicioPerfilBasicoPage implements OnInit {


	nombre:string ='Maria jose pinto ramirez';
	

  constructor( public menuCtrl: MenuController ) { }

  ionViewWillEnter() 
  {
  	this.menuCtrl.enable(true);
  }

  ngOnInit() {
  }

}
