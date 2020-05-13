import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MpExpLaboralPage } from './mp-exp-laboral.page';

const routes: Routes = [
  {
    path: '',
    component: MpExpLaboralPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MpExpLaboralPage]
})
export class MpExpLaboralPageModule {}
