import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators ,FormBuilder } from '@angular/forms';
import { Storage } from '@ionic/storage';

import { CvSkillService } from '../../services/cv-skill.service';
import { SkillListService } from '../../services/skill-list.service';
import { UiServiceService } from '../../services/ui-service.service';

import { Skill } from '../../interfaces/interfaces';

@Component({
  selector: 'app-agregar-aptitud',
  templateUrl: './agregar-aptitud.page.html',
  styleUrls: ['./agregar-aptitud.page.scss'],
})
export class AgregarAptitudPage implements OnInit {


	skills: Skill;
	// ----- formato para almacenar la informacion a actualizar------
  	addData: FormGroup;
   	// --------------------------------------------------------------
  	constructor(private storage: Storage,  
  				private uiService: UiServiceService,
  				private cvsKillService : CvSkillService,
  				private skillListService : SkillListService) { this.initForm()}

  ngOnInit() {
  	this.skillListService.getSkillListComplete().subscribe( 
  		skills=>{this.skills=skills
      	 console.log(this.skills)
    })
  }


  initForm() {
  	this.storage.get('id').then((val) => {this.addData.get('cv_id').setValue(val);})

    this.addData = new FormGroup({
    	//id : new FormControl(''),
  		cv_id: new FormControl(''),
  		skill_list_id: new FormControl(''),
  		skill: new FormControl('',[ Validators.required, Validators.maxLength(175)]),
    });
  }

  imprimir(){
  	console.log(this.addData.value)
  }




isItemAvailable = false; // Declare the variable (in this case isItemAvailable) 
                                //  and initialize the items with false

 
 items = ["Ram","gopi", "dravid"];


 getItems(ev: any) {
 // Reset items back to all of the items
 

 // set val to the value of the searchbar
 const val = ev.target.value;

 // if the value is an empty string don't filter the items
 if (val && val.trim() != '') {
     this.isItemAvailable = true;
     this.items = this.items.filter((item) => {
     return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
 })
 }
 }
}
