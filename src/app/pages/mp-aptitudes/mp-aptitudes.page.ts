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
  
  colors = ["primary", "secondary", "tertiary", "success", "warning", "danger",  "gold","dark"];
  color: Array<string> = []; 
  constructor( private cvSkillService : CvSkillService,
   private storage: Storage) { }

  ngOnInit() {


this.storage.get('id').then((val) => { 
      this.cvSkillService.getCvSkillComplete(val).subscribe( cvskill=>{
      	this.cvSkill=cvskill
      this.getRandomColor(Object.keys(cvskill).length)
      console.log(this.cvSkill)
      })
    })



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
	

}
