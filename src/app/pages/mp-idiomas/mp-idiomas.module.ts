import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MpIdiomasPage } from './mp-idiomas.page';

const routes: Routes = [
  {
    path: '',
    component: MpIdiomasPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MpIdiomasPage]
})
export class MpIdiomasPageModule {}
