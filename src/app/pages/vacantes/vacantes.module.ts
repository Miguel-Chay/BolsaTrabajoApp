import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsModule } from '../../components/components.module';
import { PopfilterComponent } from '../../components/popfilter/popfilter.component';
import { PipesModule } from '../../pipes/pipes.module';
import { IonicModule } from '@ionic/angular';

import { VacantesPage } from './vacantes.page';

const routes: Routes = [
  {
    path: '',
    component: VacantesPage
  }
];

@NgModule({
  entryComponents:[
    PopfilterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    PipesModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [VacantesPage]
})
export class VacantesPageModule {}
