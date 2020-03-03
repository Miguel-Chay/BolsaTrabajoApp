import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { EditarPerfilBasicoPage } from './editar-perfil-basico.page';

const routes: Routes = [
  {
    path: '',
    component: EditarPerfilBasicoPage
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
  declarations: [EditarPerfilBasicoPage]
})
export class EditarPerfilBasicoPageModule {}
