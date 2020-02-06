import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { UsersService } from '../../services/users.service';
import { NgForm } from '@angular/forms';

const img = 'http://www.uady.mx/media/campanas/edificio_central4.jpg';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginUser = {
    username: 'admin',
    password: 'hola'

  };

  constructor( public menuCtrl: MenuController, private userService: UsersService) { }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
  }

  async login(form: NgForm) {
    if (form.invalid) {return; }

    const valido = await this.userService.login(this.loginUser.username, this.loginUser.password);

    if(valido) {
    } 
  }

}
