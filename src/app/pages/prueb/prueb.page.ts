import { Component, OnInit } from '@angular/core';

import {FormGroup, FormControl, Validators  } from '@angular/forms';

import { WorkExperienceService } from '../../services/work-experience.service';
import { LineBusinessService } from '../../services/line-business.service';
import { UiServiceService } from '../../services/ui-service.service';

import { WorkExperience, LineBusiness } from '../../interfaces/interfaces';



@Component({
  selector: 'app-prueb',
  templateUrl: './prueb.page.html',
  styleUrls: ['./prueb.page.scss'],
})

export class PruebPage implements OnInit {

  addData: FormGroup;
  constructor(
          private uiService: UiServiceService){ 
 }

  ngOnInit() {
    
      


  }
 
 boton0(){
    console.log("boton")
    // this.uiService.HttpErrorResponse("ocurrio un error al intentar cargar la pagina",'/mi-perfil/mp-aptitudes')
        this.uiService.error("esto es un error")

  }
  boton1(){
    console.log("boton")
    // this.uiService.HttpErrorResponse("ocurrio un error al intentar cargar la pagina",'/mi-perfil/mp-aptitudes')
        this.uiService.warning("esto es una advertencia")

  }
  boton2(){
    console.log("boton")
    // this.uiService.HttpErrorResponse("ocurrio un error al intentar cargar la pagina",'/mi-perfil/mp-aptitudes')
        this.uiService.information("esto es una informacion")

  }

   
 imprimir() {
   console.log(this.addData.value)
	}	



  
}
