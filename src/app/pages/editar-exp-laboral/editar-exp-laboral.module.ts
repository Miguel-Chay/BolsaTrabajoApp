import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditarExpLaboralPage } from './editar-exp-laboral.page';

const routes: Routes = [
  {
    path: '',
    component: EditarExpLaboralPage
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
  declarations: [EditarExpLaboralPage]
})
export class EditarExpLaboralPageModule {}
