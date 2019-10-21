import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OlvidoContraseniaPage } from './olvido-contrasenia.page';

const routes: Routes = [
  {
    path: '',
    component: OlvidoContraseniaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OlvidoContraseniaPage]
})
export class OlvidoContraseniaPageModule {}
