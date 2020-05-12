import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AgregarExpLaboralPage } from './agregar-exp-laboral.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarExpLaboralPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  declarations: [AgregarExpLaboralPage]
})
export class AgregarExpLaboralPageModule {}
