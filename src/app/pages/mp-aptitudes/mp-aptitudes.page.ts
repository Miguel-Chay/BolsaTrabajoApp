import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

import { CvSkillService } from '../../services/cv-skill.service';

import { UiServiceService } from '../../services/ui-service.service';

import { CvSkillComplete } from '../../interfaces/interfaces';

@Component({
  selector: 'app-mp-aptitudes',
  templateUrl: './mp-aptitudes.page.html',
  styleUrls: ['./mp-aptitudes.page.scss'],
})
export class MpAptitudesPage implements OnInit {

  cvSkill: CvSkillComplete;
  confirm  : string;
  
  colors = ["primary", "secondary", "tertiary", "success", "warning", "danger",  "gold","dark"];
  color: Array<string> = []; 
  constructor( 
    private uiService: UiServiceService,private cvSkillService : CvSkillService,
   private storage: Storage) { }




  ngOnInit() {}
  ionViewWillEnter() {


this.storage.get('id').then((val) => { 
      this.cvSkillService.getCvSkillComplete(val).subscribe( cvskill=>{
      	this.cvSkill=cvskill
      this.getRandomColor(Object.keys(cvskill).length)
      console.log(this.cvSkill)
      })
    })



  }


  // Delete(id:string ,skill_list_id: string){
  //   this.cvSkillService.deleteCvSkill(id,skill_list_id).subscribe(Response => {this.ionViewWillEnter()});    
  // }

  async opcionesAptitud(id: string,skill_list_id: string) {
    this.confirm = await this.uiService.opcionesMiperfil('/editar-aptitud/'+skill_list_id)//manda la ruta mas el parametro id 
    if(this.confirm == "delete"){
      let reconfirm = await this.uiService.opcionesMiperfilDelete("¿Desea eliminar esta aptitud de forma permanente?" )//manda la ruta mas el parametro id 
      if (reconfirm=="delete") {       
       this.cvSkillService.deleteCvSkill(id,skill_list_id).subscribe(Response => {this.ionViewWillEnter()});
      } 
    }
   }





  getRandomColor(cant:number) {
	
		// code...
	
	for (var i = 0; i < cant; ++i) {
		 this.cvSkill[i].color=this.colors[Math.floor(Math.random() * (0 - 8)) + 8]
		// this.color = this.color.concat([this.colors[Math.floor(Math.random() * (0 - 9)) + 9]]); 
		
	}
	
	// console.log(this.colors[Math.floor(Math.random() * (0 - 9)) + 9])
	// return this.colors[Math.floor(Math.random() * (0 - 9)) + 9]
  	}
	
  doRefresh(event) {
    setTimeout(() => {
        this.ionViewWillEnter()
        event.target.complete();
    }, 1500);
  }
}
