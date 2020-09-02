import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { PipesModule } from '../../pipes/pipes.module';
import { IonicModule } from '@ionic/angular';

import { EditarAptitudPage } from './editar-aptitud.page';

const routes: Routes = [
  {
    path: '',
    component: EditarAptitudPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    PipesModule
  ],
  declarations: [EditarAptitudPage]
})
export class EditarAptitudPageModule {}
