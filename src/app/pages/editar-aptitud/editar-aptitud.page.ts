import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators ,FormBuilder } from '@angular/forms';
import { Storage } from '@ionic/storage';
import {  NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

import { CvSkillService } from '../../services/cv-skill.service';
import { SkillListService } from '../../services/skill-list.service';
import { UiServiceService } from '../../services/ui-service.service';

import { Skill } from '../../interfaces/interfaces';

@Component({
  selector: 'app-editar-aptitud',
  templateUrl: './editar-aptitud.page.html',
  styleUrls: ['./editar-aptitud.page.scss'],
})
export class EditarAptitudPage implements OnInit {

	valstart=1;
	valend=5;
	textFinder='';
	skill:Skill;
	id:string;
	skillold:Skill;
	skills: Skill[];
	botonOn:boolean;
	// ----- formato para almacenar la informacion a actualizar------
  	addData: FormGroup;
   	// --------------------------------------------------------------
  	constructor(private route: ActivatedRoute,
  				private storage: Storage,  
  				private uiService: UiServiceService,
  				private cvsKillService : CvSkillService,
  				private skillListService : SkillListService,
  				private navCtrl: NavController
  				) { this.initForm()}

  ngOnInit(){}
  
  ionViewWillEnter() {
  	this.id = this.route.snapshot.paramMap.get('id');
  	this.skillListService.getSkill(this.id).subscribe(skill=>{ 
		this.skillold=skill
		this.textFinder=this.skillold.skill
		this.botonOn=true
		// this.addData = new FormGroup({
  //   	// id : new FormControl(''),//no se usa
  // 		cv_id: new FormControl(''),
  // 		skill_list_id: new FormControl(''),
  // 		skill: new FormControl(this.skillold.skill,[ Validators.required]),
  //   });		
	})

  	this.skillListService.getSkillListComplete().subscribe( 
  		skills=>{this.skills=skills
      	 console.log(this.skills)
    },
    (error) =>{
      // console.error(error);
      console.log("error de coneccion")
      // this.uiService.HttpErrorResponse("ocurrio un error al intentar cargar la pagina",'/mi-perfil/mp-aptitudes')
      this.uiService.AlertaOK("error de conexión","alert","/mi-perfil/mp-aptitudes")
    })
  }


  initForm() {

  	this.storage.get('id').then((val) => {this.addData.get('cv_id').setValue(val);})
	
    this.addData = new FormGroup({
    	// id : new FormControl(''),//no se usa
  		cv_id: new FormControl(''),
  		skill_list_id: new FormControl(''),
  		skill: new FormControl('',[ Validators.required]),
    });
  }

  imprimir(){
  	console.log(this.skillold)
  	console.log(this.addData.value)
  }

  asignar(data:string,id:string){
  	this.textFinder=data
  	this.valend=0
  	this.valstart=0
  	this.addData.get('skill').setValue(this.textFinder)
  }

  find(event){
  	if(this.valstart==0){
  		this.valstart=1
  		
      // console.log("cambio de valores = " +this.valstart)
  	}
  	else{
      
  	  this.valend=5
  	  this.textFinder=event.detail.value
  	  this.addData.get('skill').setValue(this.textFinder)
  	}
  }

  add(text : string ) {
  	this.botonOn=false
    if (text.trim()=="") { 
      //verifica que el campo no sea solo espacios
      this.uiService.AlertaOK("El campo no debe de estar vacio","war","")
      this.textFinder=""
      this.botonOn=true
    } else {
      //si hay texto ... deshabilita el boton
	  this.botonOn=false
      text=text.toLowerCase().trim()
      if (text==this.skillold.skill.toLowerCase().trim()) { 
      	console.log("no cambio nada no se actualiza")
        this.navCtrl.navigateRoot("/mi-perfil/mp-aptitudes");

      } else {
	      	
	      //descarga de nuevo las skill para tener los agregados recientes
	      this.skillListService.getSkillListComplete().subscribe( 
	        skills=>{let skillsadd = skills
	      
	        //filtra el arreglo buscando el valor del texto
	        let aux : Skill[]=skillsadd.filter(item=>{if (item.skill.toLowerCase()==text){return true}else{return false}} )
	          //verifica si lo encuentra en la lista de skills
	          if (aux.length!=0) { 
	            //si existe 
	            this.addData.get('skill_list_id').setValue(aux[0].id)//le pone el id al addData

	            this.cvsKillService.getCvSkillExist(this.addData.get('cv_id').value,this.addData.get('skill_list_id').value)
	              .subscribe( cvskill=>{ 
	                //verifica si el usuario tiene agregado la skill
	                if (cvskill==1)  
	                {
	                  //si lo tiene le avisa 
	        			this.uiService.AlertaOK("Esta aptitud ya ha sido registrada en su cuenta","war","")
	        			this.botonOn=true
	                }  
	                else{
	                  //no lo tiene -> se lo agrega
	                  this.cvsKillService.addCvSkill(this.addData.get('cv_id').value,
	                    this.addData.get('skill_list_id').value,
	                    this.addData.get('skill').value).subscribe( cvskill=>{
       						this.cvsKillService.deleteCvSkill(this.addData.get('cv_id').value,this.skillold.id).subscribe(Response => {
	                    		this.navCtrl.navigateRoot("/mi-perfil/mp-aptitudes");
	                    		console.log("borrado primero")
       						});
	                	});
	                }
	              })
	          }else {
	            //no existe-> lo agrega a la lista de skills
	            this.addData.get('skill_list_id').setValue('')//le pone el id al addData
	            this.skillListService.addSkill(this.addData.get('skill').value).subscribe( cvskill=>{
	              //ejecuta de nuevo la funcion
	              this.addedSkill(text)
	            });

	          }


	      },
	      (error) =>{
	        // console.error(error);
	        console.log("error de coneccion")
	        // this.uiService.HttpErrorResponse("ocurrio un error al intentar cargar la pagina",'/mi-perfil/mp-aptitudes')
	        this.uiService.AlertaOK("Error de conexión","alert","/mi-perfil/mp-aptitudes")
	      })
      }
 
    }
  }
 
 


addedSkill(text){
 

      //si hay texto 
      text=text.toLowerCase().trim()
      if (text==this.skillold.skill.toLowerCase().trim()) { 
      	console.log("no cambio nada no se actualiza")
        this.navCtrl.navigateRoot("/mi-perfil/mp-aptitudes");

      } else {
	      	
	      //descarga de nuevo las skill para tener los agregados recientes
	      this.skillListService.getSkillListComplete().subscribe( 
	        skills=>{let skillsadd = skills
	      
	        //filtra el arreglo buscando el valor del texto
	        let aux : Skill[]=skillsadd.filter(item=>{if (item.skill.toLowerCase()==text){return true}else{return false}} )
	          //verifica si lo encuentra en la lista de skills
	           if (aux.length!=0) { 
	            //si existe 
	            this.addData.get('skill_list_id').setValue(aux[0].id)//le pone el id al addData

	            this.cvsKillService.getCvSkillExist(this.addData.get('cv_id').value,this.addData.get('skill_list_id').value)
	              .subscribe( cvskill=>{ 
	                //verifica si el usuario tiene agregado la skill
	                if (cvskill==1)  
	                {
	                  //si lo tiene lo regresa a la pagina de skills
	        			this.uiService.AlertaOK("esta aptitud ya ha sido registrada en su cuenta","war","")
	                }  
	                else{
	                  //no lo tiene -> se lo agrega
	                  this.cvsKillService.addCvSkill(this.addData.get('cv_id').value,
	                    this.addData.get('skill_list_id').value,
	                    this.addData.get('skill').value).subscribe( cvskill=>{
       						this.cvsKillService.deleteCvSkill(this.addData.get('cv_id').value,this.skillold.id).subscribe(Response => {
	                    		this.navCtrl.navigateRoot("/mi-perfil/mp-aptitudes");
	                    		console.log("borrado segundo")
       						});
	                	});
	                }
	              })
	          }else {
	            //no existe->sale de la pagina
	            this.uiService.alertaLeave("Lo sentimos, no se puede agregar esta skill","/mi-perfil/mp-aptitudes")            
	          }


	      },
	      (error) =>{
	        // console.error(error);
	        console.log("error de coneccion")
	        // this.uiService.HttpErrorResponse("ocurrio un error al intentar cargar la pagina",'/mi-perfil/mp-aptitudes')
	        this.uiService.AlertaOK("error de conexión","alert","/mi-perfil/mp-aptitudes")
	      })
      
 
    }
  }
 

  boton(){
    console.log("boton")
    // this.uiService.HttpErrorResponse("ocurrio un error al intentar cargar la pagina",'/mi-perfil/mp-aptitudes')
        // this.uiService.error("error de conexión")

  }


}
