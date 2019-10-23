import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

const img = "http://www.uady.mx/media/campanas/edificio_central4.jpg";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor( public menuCtrl: MenuController ) { }

  ionViewWillEnter() 
  {
  	this.menuCtrl.enable(false);
  }

  ngOnInit() {
  }

}
