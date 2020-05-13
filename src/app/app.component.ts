import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Mi perfil',
      url: '/mi-perfil/mp-exp-laboral',
      icon: 'person'
    },
    {
      title: 'Mis Oportunidades',
      url: '/oportunidades',
      icon: 'git-network'
    },
    {
      title: 'Mis Postulaciones',
      url: '/postulaciones',
      icon: 'paper-plane'
    },
    {
      title: 'Mis Vacantes',
      url: '/vacantes',
      icon: 'paper'
    },
    {
      title: 'Cerrar Sesion',
      url: '/login',
      icon: 'walk'
    }

  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
