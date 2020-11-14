import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MpFormAcademicaPage } from './mp-form-academica.page';
import { flush } from '@angular/core/testing';
// import { AgregarFormAcademicaPage } from '../agregar-form-academica/agregar-form-academica.page';
// import { AgregarFormAcademicaPageModule } from '../agregar-form-academica/agregar-form-academica.module';

const routes: Routes = [
  {
    path: '',
    component: MpFormAcademicaPage,
  }
  // {
  //   path: '',
  //   redirectTo: '',
  //   component: MpFormAcademicaPage,
  //   pathMatch: 'full'
  // },
  // {
  //   path: 'agregar-form-academica',
  //   loadChildren: '../agregar-form-academica/agregar-form-academica.module#AgregarFormAcademicaPageModule' 
  // },
  // {
  //   path: 'form-academica/agregar',
  //   loadChildren: '../form-academica/form-academica.module#FormAcademicaPageModule'
  // },
  // {
  //   path: 'form-academica/:id/editar',
  //   loadChildren: '../form-academica/form-academica.module#FormAcademicaPageModule'
  // }

];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MpFormAcademicaPage]
})
export class MpFormAcademicaPageModule {}
