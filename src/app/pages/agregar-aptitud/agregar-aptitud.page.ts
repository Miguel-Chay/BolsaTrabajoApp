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

	skills: Skill[];
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
    },
    (error) =>{
      // console.error(error);
      console.log("error de coneccion")
      // this.uiService.HttpErrorResponse("ocurrio un error al intentar cargar la pagina",'/mi-perfil/mp-aptitudes')
      this.uiService.AlertaOK("Error de conexión","alert","/mi-perfil/mp-aptitudes")
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

  // imprimir(){
  // 	console.log(this.addData.value)
  // }

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


    if (text.trim()=="") { 
      //verifica que el campo no sea solo espacios
      this.uiService.AlertaOK("El campo no debe de estar vacio","war","")
      // this.uiService.alertaInformativa("el campo no debe de estar vacio")
      this.textFinder=""
    } else {
      //si hay texto 
      text=text.toLowerCase().trim()
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
                  this.navCtrl.navigateRoot("/mi-perfil/mp-aptitudes");
                }  
                else{
                  //no lo tiene -> se lo agrega
                  this.cvsKillService.addCvSkill(this.addData.get('cv_id').value,
                                  this.addData.get('skill_list_id').value,
                                  this.addData.get('skill').value).subscribe( cvskill=>{
                                  this.navCtrl.navigateRoot("/mi-perfil/mp-aptitudes");
                                });
                }
              })
          } else {
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
 
 


addedSkill(text){
  //si hay texto 
      text=text.toLowerCase().trim()
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
                  this.navCtrl.navigateRoot("/mi-perfil/mp-aptitudes");
                }  
                else{
                  //no lo tiene -> se lo agrega
                  this.cvsKillService.addCvSkill(this.addData.get('cv_id').value,
                                  this.addData.get('skill_list_id').value,
                                  this.addData.get('skill').value).subscribe( cvskill=>{
                                  this.navCtrl.navigateRoot("/mi-perfil/mp-aptitudes");
                                });
                }
              })
          } else {
            //si no lo encuentra lo regresa a la pagina 
            this.uiService.AlertaOK("Lo sentimos, no se puede agregar esta skill","war","/mi-perfil/mp-aptitudes")
          }


      },
      (error) =>{
        // console.error(error);
        console.log("error de coneccion")
        // this.uiService.HttpErrorResponse("ocurrio un error al intentar cargar la pagina",'/mi-perfil/mp-aptitudes')
        this.uiService.AlertaOK("Error de conexión","alert","/mi-perfil/mp-aptitudes")
         
      })
  }

  boton(){
    console.log("boton")
    // this.uiService.HttpErrorResponse("ocurrio un error al intentar cargar la pagina",'/mi-perfil/mp-aptitudes')
        // this.uiService.error("error de conexión")

  }


}
