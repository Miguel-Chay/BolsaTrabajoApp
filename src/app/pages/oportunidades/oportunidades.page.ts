import { JobOpeningService } from './../../services/job-opening.service';
import { CvService } from './../../services/cv.service';
import { CvMatch, Match } from './../../interfaces/interfaces';
import { Component, OnInit, Input } from '@angular/core';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { NavController } from '@ionic/angular';



@Component({
  selector: 'app-oportunidades',
  templateUrl: './oportunidades.page.html',
  styleUrls: ['./oportunidades.page.scss'],
})
export class OportunidadesPage implements OnInit {
  URL = environment.urlPhotos;
  Match: Match;
  ismatch = false;
  logo = this.URL + '/btuady/public_html/files/logo/organization/';
  constructor(
    private storage: Storage,
    private cvService: CvService,
    private jobOpeningService: JobOpeningService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.storage.get('id').then((id) => {
      this.cvService.matchCv(id).subscribe((response) => {


          if (response.ok === true) {
            this.ismatch = true;
            this.jobOpeningService.jobsMatch(response.match).subscribe((match) => {
            this.Match = match;
          });
          } else { this.ismatch = false; }

      });
    });
  }

  islast(array: any, j: any) {
    if (array[Object.keys(array).length - 1] === j) {
      return true;
    } else {
      return false;
    }
  }

  goSeeVacant(id: string) {
    // console.log(id)
    this.navCtrl.navigateForward('/vacante/o/' + id, { animated: true });
  }
}
