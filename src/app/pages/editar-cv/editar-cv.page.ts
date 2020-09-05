import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { UiServiceService } from '../../services/ui-service.service';

import { CvService } from '../../services/cv.service';

import { Cv } from '../../interfaces/interfaces';

@Component({
  selector: 'app-editar-cv',
  templateUrl: './editar-cv.page.html',
  styleUrls: ['./editar-cv.page.scss'],
})
export class EditarCvPage implements OnInit {

  val: string = null;
  conf: boolean= null;
  cv: Cv={};
  re = /[a-z0-9._%+-]/;

  constructor(private cvService : CvService,private storage: Storage,private uiService: UiServiceService,
    private navCtrl: NavController, private alertController: AlertController) { }

  ngOnInit() {

  	this.storage.get('id').then((val) => { 
  	this.cvService.getCv(val).subscribe( cv=>{this.cv=cv
      console.log(this.cv)
    })
  })
  }


  async discardchanges(){
    await this.uiService.AlertLeaveOKCANCEL('Desea descartar los cambios',"war",'/inicio-perfil-basico')
  }

  async savechanges(form: NgForm) {

    if (this.cv.summary.trim()=="") { 
      this.uiService.AlertaOK("Resumen no puede estar vacío. Por favor use caracteres [A-z][0-9]","war","")
    } else {
      const confirm = await this.uiService.AlertLeaveOKCANCEL('Desea guardar los cambios',"info",'/inicio-perfil-basico')
      if(confirm)
        this.cvService.updateCv(this.cv.candidate_id,this.cv.status, this.cv.summary).subscribe( cv=>{});
    }

  }


}
