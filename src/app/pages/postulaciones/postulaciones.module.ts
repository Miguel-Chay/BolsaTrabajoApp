import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { PipesModule } from '../../pipes/pipes.module';
import { IonicModule } from '@ionic/angular';

import { PostulacionesPage } from './postulaciones.page';

const routes: Routes = [
  {
    path: '',
    component: PostulacionesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    PipesModule
  ],
  declarations: [PostulacionesPage]
})
export class PostulacionesPageModule {}
