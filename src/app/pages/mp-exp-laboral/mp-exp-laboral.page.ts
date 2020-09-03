import { Component, OnInit, ViewChild  } from '@angular/core';
import { AlertController } from '@ionic/angular'; 
import { ActionSheetController } from '@ionic/angular'; 
import {Platform,LoadingController} from '@ionic/angular'
import { Storage } from '@ionic/storage';
// import { NavController,NavParams  } from '@ionic/angular';
// import { Router } from '@angular/router';

import { WorkExperienceService } from '../../services/work-experience.service';
import { LineBusinessService } from '../../services/line-business.service';
import { UiServiceService } from '../../services/ui-service.service';

import { WorkExperience, LineBusiness } from '../../interfaces/interfaces';


@Component({
  selector: 'app-mp-exp-laboral',
  templateUrl: './mp-exp-laboral.page.html',
  styleUrls: ['./mp-exp-laboral.page.scss'],
})
export class MpExpLaboralPage implements OnInit {
  val: string = null;
  confirm:string ;
  workexperience: WorkExperience;
  linebusiness : LineBusiness = {}
  
  constructor(public alertController: AlertController, public actionSheetController: ActionSheetController,
    private workexperienceService : WorkExperienceService, private linebusinessService : LineBusinessService,  
    private storage: Storage,private uiService: UiServiceService,public platform : Platform, public loadingController :LoadingController) {}

  ngOnInit() {
      // console.log("ngOnInit")
  }
  // ionViewDidEnter() {
  //   console.log("ionViewDidEnter")
  // }
  // ionViewDidLoad() {
  //   console.log("ionViewDidLoad")
  // }
  prueba(){
    this.ionViewWillEnter();
  }


  
   ionViewWillEnter() { 
    // console.log("ionViewWillEnter")

   	//this.saving()
    this.storage.get('id').then((val) => { 
      this.workexperienceService.getWorkExComplete (val).subscribe( workexperience=>{this.workexperience=workexperience
      console.log(this.workexperience)
      })
    })
   }

   imprimir(){
     console.log(this.workexperience)
   }


  async opcionesExpLab(id: string) {
    this.confirm = await this.uiService.opcionesMiperfil('/editar-exp-laboral/'+id)//manda la ruta mas el parametro id 
    if(this.confirm== "delete"){
      let reconfirm = await this.uiService.opcionesMiperfilDelete("¿Desea eliminar esta experiencia de trabajo de forma permanente?" )//manda la ruta mas el parametro id 
      if (reconfirm=="delete") {       
        this.workexperienceService.deleteWorkExperience(id).subscribe(Response => {this.ionViewWillEnter()});
      } 
    }
   }

  doRefresh(event) {
    setTimeout(() => {
        this.ionViewWillEnter()
        event.target.complete();
    }, 1500);
  }



  
   saving(){
    this.platform.ready().then(()=>{
      this.loadingController.create({
        message:"Cargando..."
      }).then((loadingElement)=>{
        loadingElement.present();
        var ref = this;
        setTimeout(function()
        {
          ref.loadingController.dismiss();
        },500)
      })
    })
    }
} 
