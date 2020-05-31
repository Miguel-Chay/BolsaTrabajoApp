import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { PipesModule } from '../../pipes/pipes.module';
import { IonicModule } from '@ionic/angular';

import { AgregarAptitudPage } from './agregar-aptitud.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarAptitudPage
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
  declarations: [AgregarAptitudPage]
})
export class AgregarAptitudPageModule {}
