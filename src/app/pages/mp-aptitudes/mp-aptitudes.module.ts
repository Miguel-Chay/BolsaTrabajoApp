import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MpAptitudesPage } from './mp-aptitudes.page';

const routes: Routes = [
  {
    path: '',
    component: MpAptitudesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MpAptitudesPage]
})
export class MpAptitudesPageModule {}
