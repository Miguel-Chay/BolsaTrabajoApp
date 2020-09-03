import { Component, OnInit, ViewChild  } from '@angular/core';
import {FormGroup, FormControl, Validators ,FormBuilder } from '@angular/forms';
import { AlertController } from '@ionic/angular'; 
import { ActionSheetController } from '@ionic/angular'; 
import { Storage } from '@ionic/storage';

import { LanguageService } from '../../services/language.service';
import { LevelListService } from '../../services/level-list.service';
import { LanguageListService } from '../../services/language-list.service';
import { UiServiceService } from '../../services/ui-service.service';

import { Language, LanguageList,LevelList,LanguageComplete } from '../../interfaces/interfaces';

@Component({
  selector: 'app-mp-idiomas',
  templateUrl: './mp-idiomas.page.html',
  styleUrls: ['./mp-idiomas.page.scss'],
})
export class MpIdiomasPage implements OnInit {
	languages:LanguageComplete;
	language:Language;
	list : 	LanguageList
	level : LevelList
  confirm  : string;
	// ----- formato para almacenar la informacion a actualizar------
  	addData: FormGroup;
   	// --------------------------------------------------------------
  constructor(public alertController: AlertController,private storage: Storage,
  	private uiService: UiServiceService,public actionSheetController: ActionSheetController,
  	private languageService :LanguageService,private languageListService :LanguageListService,
  	private levelService :LevelListService) { 
  	this.initForm()
  }
  ngOnInit() {}

  ionViewWillEnter() {
  	// this.storage.get('id').then((val) => { 
   //    this.languageService.getLanguagesComplete(val).subscribe( language=>{this.language=language
   //    console.log(this.language)
   //    })
   //  })

  	this.storage.get('id').then((val) => { 
      this.languageService.getLanguagesComplete(val).subscribe( languages=>{this.languages=languages
      console.log(this.languages)
      this.addData.get('cv_id').setValue(val)//le asigna el valor del id a addData para si se quiere hacer un Post o Put
      })
    })
    
  	// this.languageListService.getListComplete().subscribe( list=>{this.list=list
   //    	console.log(this.list)
   //  })

    

    
   //  this.levelService.getLevelListComplete().subscribe( level=>{this.level=level
   //  	console.log(this.level)
   //  })

    

  }

	initForm() {
  		

    this.addData = new FormGroup({
    	//id : new FormControl(''),
  		cv_id: new FormControl(''),
  		language_list_id: new FormControl(''),
  		level_list_id: new FormControl(''),
    });
  }



async opcionesIdioma(id: string) {
    this.confirm = await this.uiService.opcionesMiperfil('/editar-idioma/'+id)//manda la ruta mas el parametro id 
    if(this.confirm == "delete"){
      let reconfirm = await this.uiService.opcionesMiperfilDelete("¿Desea eliminar este idioma de forma permanente?" )//manda la ruta mas el parametro id 
      if (reconfirm=="delete") {       
        this.languageService.deleteLanguage(id).subscribe(Response => {this.ionViewWillEnter()});        
      }   
    }
   }

 doRefresh(event) {
    setTimeout(() => {
        this.ionViewWillEnter()
        event.target.complete();
    }, 1500);
  }

}
