import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AgregarFormAcademicaPage } from './agregar-form-academica.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarFormAcademicaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AgregarFormAcademicaPage]
})
export class AgregarFormAcademicaPageModule {}
