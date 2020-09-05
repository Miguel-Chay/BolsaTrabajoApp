import { Component, OnInit, ViewChild  } from '@angular/core';
import {FormGroup, FormControl, Validators ,FormBuilder } from '@angular/forms';
import { AlertController } from '@ionic/angular'; 
import { ActionSheetController,NavController } from '@ionic/angular'; 
import { Storage } from '@ionic/storage';

import { LanguageService } from '../../services/language.service';
import { LevelListService } from '../../services/level-list.service';
import { LanguageListService } from '../../services/language-list.service';
import { UiServiceService } from '../../services/ui-service.service';

import { Language, LanguageList,LevelList,LanguageComplete } from '../../interfaces/interfaces';

@Component({
  selector: 'app-agregar-idioma',
  templateUrl: './agregar-idioma.page.html',
  styleUrls: ['./agregar-idioma.page.scss'],
})
export class AgregarIdiomaPage implements OnInit {

	list : 	LanguageList
	level : LevelList
    // ----- formato para almacenar la informacion a actualizar------
  	addData: FormGroup;
   	// --------------------------------------------------------------

  constructor(private languageService :LanguageService,private languageListService :LanguageListService,
  	private levelService :LevelListService,private storage: Storage,private uiService: UiServiceService,
  	private navCtrl: NavController,) { }

  ngOnInit() {
  	this.initForm()

  	this.languageListService.getListComplete().subscribe( list=>{this.list=list
      	// console.log(this.list)
    })

    this.levelService.getLevelListComplete().subscribe( level=>{this.level=level
    	// console.log(this.level)
    })

  }

  	initForm() {
  		
  		this.storage.get('id').then((val) => {this.addData.get('cv_id').setValue(val)})
    	this.addData = new FormGroup({
    	//id : new FormControl(''),
  		cv_id: new FormControl(''),
  		language_list_id: new FormControl('',Validators.required),
  		level_list_id: new FormControl('',Validators.required),
    	});

  	}

  	imprimir(){console.log(this.addData.value)}

  	addLanguage(){

  		this.languageService.getLanguageExist(this.addData.get('cv_id').value,this.addData.get('language_list_id').value).subscribe( exist=>{
    	
    		if (exist==1)
    			{
    				// this.uiService.alertaInformativa("Este idioma ya ha sido registrado en su cuenta")
            this.uiService.AlertaOK("Este idioma ya ha sido registrado en su cuenta","war","")

    			}
    		else
    			{
    				this.languageService.addLanguage(
    					this.addData.get('cv_id').value,
    					this.addData.get('language_list_id').value,
    					this.addData.get('level_list_id').value,
    					).subscribe( lenguage=>{});

    				this.navCtrl.navigateRoot('/mi-perfil/mp-idiomas');
    			}
    	})
  		


  	}


}
