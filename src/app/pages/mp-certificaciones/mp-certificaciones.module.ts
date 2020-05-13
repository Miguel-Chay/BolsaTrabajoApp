import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MpCertificacionesPage } from './mp-certificaciones.page';

const routes: Routes = [
  {
    path: '',
    component: MpCertificacionesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MpCertificacionesPage]
})
export class MpCertificacionesPageModule {}
