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
  // ionViewDidLeave(){
  //   console.log('ionViewDidLeave desde la barra');
  // }
  // ionViewWillEnter() { 
  //   console.log("ionViewWillEnter desde la barra")
  //   this.mpExpLaboralPage.ionViewWillEnter()
  // }
  hidenTabs(myTabs) {
    // sconsole.log(this.pageForm.hidetabs);
    // myTabs.tabBar.el.hidden = true;
  }
  // gets( ) {
      // this.router.navigateByUrl("mi-perfil/mp-exp-laboral" );

    // if ("/tabs/" + tab.getSelected() != this.router.url) {
    //   this.router.navigateByUrl("tabs/" + tab.getSelected());
    // }
  // }

}
