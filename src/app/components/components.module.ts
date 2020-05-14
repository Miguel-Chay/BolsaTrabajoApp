import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FabComponent } from './fab/fab.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    FabComponent
  ],
  exports: [
    FabComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ]
})
export class ComponentsModule { }
