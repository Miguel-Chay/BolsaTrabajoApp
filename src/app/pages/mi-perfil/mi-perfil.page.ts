import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MpFormAcademicaPage } from '../mp-form-academica/mp-form-academica.page';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.page.html',
  styleUrls: ['./mi-perfil.page.scss'],
})
export class MiPerfilPage implements OnInit {

	constructor() { }
  // @ViewChild('mp-form-academica', {static: false} ) pageForm: MpFormAcademicaPage;
  ngOnInit() {
  }
  ionViewDidLeave(){
    console.log('se ejecuta');
  }
  hidenTabs(myTabs) {
    // sconsole.log(this.pageForm.hidetabs);
    // myTabs.tabBar.el.hidden = true;
  }
  

}
