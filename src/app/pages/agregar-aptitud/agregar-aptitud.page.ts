import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators ,FormBuilder } from '@angular/forms';
import { Storage } from '@ionic/storage';
import {  NavController } from '@ionic/angular';

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

	valstart=1;
	valend=12;
	textFinder='';
	skill:Skill;

	skills: Skill;
	// ----- formato para almacenar la informacion a actualizar------
  	addData: FormGroup;
   	// --------------------------------------------------------------
  	constructor(private storage: Storage,  
  				private uiService: UiServiceService,
  				private cvsKillService : CvSkillService,
  				private skillListService : SkillListService,
  				private navCtrl: NavController
  				) { this.initForm()}

  ngOnInit(){}
  
  ionViewWillEnter() {
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
  		skill: new FormControl('',[ Validators.required]),
    });
  }

  imprimir(){
  	console.log(this.addData.value)
  }

  asignar(data:string){
  	
  	this.textFinder=data
  	// this.value=data
  	this.valend=0
  	this.valstart=0
  	this.addData.get('skill').setValue(this.textFinder)
  	console.log(this.textFinder,this.valstart, this.valend)
  }

  find(event){
  	if(this.valstart==0){
  		this.valstart=1
  		console.log("cambio de valores = " +this.valstart)
  	}
  	else{
  	// this.value=event.detail.value
  	this.valend=5
  	console.log("execut teh finder")
  	this.textFinder=event.detail.value
  	this.addData.get('skill').setValue(this.textFinder)
  	}
  }


  add(){

  	this.skillListService.getSkillExist(this.addData.get('skill').value).subscribe( skill=>{ 
  			this.skill=skill
  			console.log( skill)
  			// console.log( skill.skill)
  			// this.addData.get('skill').setValue(skill.skill)
  			
  			if(this.skill!=null)
  			{
  				console.log("existe en la lista")
  				this.addData.get('skill_list_id').setValue(this.skill.id)

  				this.cvsKillService.getCvSkillExist(this.addData.get('cv_id').value,this.skill.id)
  					.subscribe( cvskill=>{ 
  						if (cvskill==1)	
  						{
  							console.log("lo thiene en agregado")
  							this.navCtrl.navigateRoot("/mi-perfil/mp-aptitudes");
  						}	
  						else{
  							console.log("se le agrega")
  							this.cvsKillService.addCvSkill(this.addData.get('cv_id').value,
  															this.addData.get('skill_list_id').value,
  															this.addData.get('skill').value).subscribe( cvskill=>{
  																this.navCtrl.navigateRoot("/mi-perfil/mp-aptitudes");
  															});

  						}
  					 })
  			}
  			else{
  				console.log("no existe en la lista de skills se agrega"+ this.skill)
  				this.skillListService.addSkill(this.addData.get('skill').value).subscribe( cvskill=>{
  					this.ionViewWillEnter()
  					this.add()
  				});

  			}
  			// this.imprimir()
  		 })


  }


  	 

 
}
