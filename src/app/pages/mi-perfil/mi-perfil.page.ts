import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MpFormAcademicaPage } from '../mp-form-academica/mp-form-academica.page';
//providers
import {MpExpLaboralPage}from '../mp-exp-laboral/mp-exp-laboral.page' ;
//pruebas
import { Router } from '@angular/router';



@Component({
  providers:[MpExpLaboralPage],

  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.page.html',
  styleUrls: ['./mi-perfil.page.scss'],
})
export class MiPerfilPage implements OnInit {

	constructor( private router: Router,
                  private mpExpLaboralPage: MpExpLaboralPage,
    ) { }
  // @ViewChild('mp-form-academica', {static: false} ) pageForm: MpFormAcademicaPage;
  ngOnInit() {
  }

  hidenTabs(myTabs) {
  }

}
