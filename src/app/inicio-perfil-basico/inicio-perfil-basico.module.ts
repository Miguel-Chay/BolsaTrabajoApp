import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InicioPerfilBasicoPage } from './inicio-perfil-basico.page';

const routes: Routes = [
  {
    path: '',
    component: InicioPerfilBasicoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InicioPerfilBasicoPage]
})
export class InicioPerfilBasicoPageModule {}
