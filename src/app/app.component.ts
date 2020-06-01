import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Candidate } from './interfaces/interfaces';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UiServiceService } from './services/ui-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  candidate: Candidate = {firstname: '', lastname: '', photo: ''};
  URL = environment.urlPhotos;
  photoRoutbase: string = this.URL + '/btuady/public_html/files/photo/';
  photoRout= '';
  confirm= false;

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
    }


  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private uiService: UiServiceService,
  ) {
    this.initializeApp();
    this.loadInformation();
  }


// ionViewWillEnter  para mostrar foto y nombre


  loadInformation() {
    this.storage.get('candidate').then((candidate) => {
      if (candidate != null) {
        this.candidate = JSON.parse(candidate);

        console.log(this.candidate.sex);
        console.log(this.candidate.photo);

        if (this.candidate.photo == null) {
          if (this.candidate.sex === 'female') {
            this.photoRout = './assets/image/Mujer.png';
          } else {
            this.photoRout = './assets/image/Hombre.png';
          }
        } else {
          this.photoRout = this.photoRoutbase + this.candidate.photo;
        }
      }



    });
    console.log('carga desde la pagina de mi  perfil basico');
  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async clear() {
    this.confirm = await this.uiService.alertaConfirmar('¿Desea cerrar su sesión?', '/login');// manda la ruta mas el parametro id
    if (confirm) {
      this.storage.clear();
      this.candidate.firstname = '';
      this.candidate.lastname = '';
      this.candidate.photo = '';
      this.photoRout = '';



    }
  }
}
