import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AgregarCertificacionPage } from './agregar-certificacion.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarCertificacionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AgregarCertificacionPage]
})
export class AgregarCertificacionPageModule {}
