import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MpFormAcademicaPage } from './mp-form-academica.page';
import { AgregarFormAcademicaPage } from '../agregar-form-academica/agregar-form-academica.page';

const routes: Routes = [
  {
    path: '',
    component: MpFormAcademicaPage
  }
  // {
  //   path: '',
  //   component: MpFormAcademicaPage,
  //   children: [
  //     {
  //       // path: 'agregar-form-academica',
  //       // component: AgregarFormAcademicaPage,
  //       // loadChildren: './pages/agregar-form-academica/agregar-form-academica.module#AgregarFormAcademicaPageModule'
  //     }
  //   ]
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
