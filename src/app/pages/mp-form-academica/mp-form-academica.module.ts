import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MpFormAcademicaPage } from './mp-form-academica.page';

const routes: Routes = [
  {
    path: '',
    component: MpFormAcademicaPage
  }
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
