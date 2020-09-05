import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { UsersService } from '../../services/users.service';
import { NgForm } from '@angular/forms';
import { UiServiceService } from '../../services/ui-service.service';

const img = 'http://www.uady.mx/media/campanas/edificio_central4.jpg';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginUser = {
    username: '',
    password: ''
  };

  constructor( public menuCtrl: MenuController, private userService: UsersService,
               private navCtrl: NavController, private uiService: UiServiceService) { }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
  }

  async login(form: NgForm) {
    if (form.invalid) {return; }

    const valido = await this.userService.login(this.loginUser.username, this.loginUser.password);
    if (valido.toString().match('no es candidato'))  {
      this.uiService.AlertaOK('No es un candidato',"war","");
      return;
    }
    if (valido) {
      this.navCtrl.navigateRoot('/inicio-perfil-basico');
    } else {
      this.uiService.AlertaOK('usuario o contraseña incorrecta',"war","");
    }
  }

}