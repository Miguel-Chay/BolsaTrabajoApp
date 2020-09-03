import { Component, OnInit } from '@angular/core';

import {FormGroup, FormControl, Validators  } from '@angular/forms';

import { WorkExperienceService } from '../../services/work-experience.service';
import { LineBusinessService } from '../../services/line-business.service';
import { UiServiceService } from '../../services/ui-service.service';

import { WorkExperience, LineBusiness } from '../../interfaces/interfaces';

import {AppComponent}from '../../app.component' ;
import {MpExpLaboralPage}from '../mp-exp-laboral/mp-exp-laboral.page' ;



@Component({
  providers:[MpExpLaboralPage],

  selector: 'app-prueb',
  templateUrl: './prueb.page.html',
  styleUrls: ['./prueb.page.scss'],
})

export class PruebPage implements OnInit {

  addData: FormGroup;
  constructor(  private appComponent:AppComponent ,
                private uiService: UiServiceService,
                private mpExpLaboralPage: MpExpLaboralPage,
                ){ 
 }

  ngOnInit() {
    
      


  }

 // imprimir(){}
 
 boton0(){
    console.log("boton")
    // this.uiService.HttpErrorResponse("ocurrio un error al intentar cargar la pagina",'/mi-perfil/mp-aptitudes')
        this.uiService.AlertLeaveOKCANCEL("esto es un error","war","/mi-perfil/mp-aptitudes")

  }
  boton1(){
    console.log("boton")
    // this.uiService.HttpErrorResponse("ocurrio un error al intentar cargar la pagina",'/mi-perfil/mp-aptitudes')
        this.uiService.AlertaOK("esto es una advertencia","war","")

  }
  boton2(){
    console.log("boton")
    // this.uiService.HttpErrorResponse("ocurrio un error al intentar cargar la pagina",'/mi-perfil/mp-aptitudes')
        this.uiService.AlertaOK("esto es una informacion","info","")

  }

   
 imprimir() {
console.log('appComponent')
   this.appComponent.imprimir();
   this.mpExpLaboralPage.imprimir();

	}	



  
}
