import { Component, OnInit, ViewChild  } from '@angular/core';
import {FormGroup, FormControl, Validators ,FormBuilder } from '@angular/forms';
import { AlertController } from '@ionic/angular'; 
import { ActionSheetController,NavController } from '@ionic/angular'; 
import { Storage } from '@ionic/storage';
import { ActivatedRoute } from '@angular/router';

import { LanguageService } from '../../services/language.service';
import { LevelListService } from '../../services/level-list.service';
import { LanguageListService } from '../../services/language-list.service';
import { UiServiceService } from '../../services/ui-service.service';

import { Language, LanguageList,LevelList,LanguageComplete } from '../../interfaces/interfaces';


@Component({
  selector: 'app-editar-idioma',
  templateUrl: './editar-idioma.page.html',
  styleUrls: ['./editar-idioma.page.scss'],
})
export class EditarIdiomaPage implements OnInit {
	id : string;
  list : 	LanguageList
	level : LevelList
	language : Language
  levelstart = "1"
  languagestart="1"
    // ----- formato para almacenar la informacion a actualizar------
  	addData: FormGroup;
   	// --------------------------------------------------------------

  constructor(private languageService :LanguageService,private languageListService :LanguageListService,
  	private levelService :LevelListService,private storage: Storage,private uiService: UiServiceService,
  	private navCtrl: NavController,private route: ActivatedRoute) { }

  ngOnInit() {
  	this.initForm()
  	this.id = this.route.snapshot.paramMap.get('id');

  	this.languageService.getLanguage(this.id).subscribe( language=>{this.language=language 

    	this.addData = new FormGroup({
    	id : new FormControl(this.language.id),
  		cv_id: new FormControl(this.language.cv_id),
  		language_list_id: new FormControl(this.language.language_list_id,Validators.required),
  		level_list_id: new FormControl(this.language.level_list_id,Validators.required),
    	});
      this.levelstart=this.language.level_list_id
      this.languagestart=this.language.language_list_id
    })

  	this.languageListService.getListComplete().subscribe( list=>{this.list=list
      	// console.log(this.list)
    })

    this.levelService.getLevelListComplete().subscribe( level=>{this.level=level
    	// console.log(this.level)
    })

  }

  	initForm() {
  		
  		
    	this.addData = new FormGroup({
    	id : new FormControl(''),
  		cv_id: new FormControl(''),
  		language_list_id: new FormControl(''),
  		level_list_id: new FormControl(''),
    	});

  	}

  	imprimir(){console.log(this.addData.value)
      console.log("lenguaje= "+this.languagestart+" nivel= "+this.levelstart)
    }

  	addLanguage(){

  		this.languageService.getLanguageExist(this.addData.get('cv_id').value,this.addData.get('language_list_id').value).subscribe( exist=>{
    	  
        if (this.languagestart==this.addData.get('language_list_id').value) { 
          // console.log("mismo lenguaje")
          if (this.levelstart==this.addData.get('level_list_id').value) { 
            // console.log("mismo nivel")
            this.navCtrl.navigateRoot('/mi-perfil/mp-idiomas');
          } else {
            this.languageService.updateLanguage(
                this.addData.get('id').value,
                this.languagestart,
                this.addData.get('level_list_id').value,
                ).subscribe( lenguage=>{
                  this.navCtrl.navigateRoot('/mi-perfil/mp-idiomas');
                });
            // console.log("se actualiza")
          }
        } else {
          // console.log("pregunta si existe el idioma")
      		if (exist==1)
      			{
      				this.uiService.AlertaOK("Este idioma ya ha sido registrado en su cuenta","war","")
      			}
      		else
      			{
      				this.languageService.updateLanguage(
      					this.addData.get('id').value,
      					this.addData.get('language_list_id').value,
      					this.addData.get('level_list_id').value,
      					).subscribe( lenguage=>{
                  this.navCtrl.navigateRoot('/mi-perfil/mp-idiomas');
                });

      				
      			}
        }


    	})
  		


  	}

}
