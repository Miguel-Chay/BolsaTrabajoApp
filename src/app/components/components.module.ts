import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FabComponent } from './fab/fab.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { PopfilterComponent } from './popfilter/popfilter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PopoverComponent } from './popover/popover.component';

@NgModule({
  declarations: [
    FabComponent,
    PopfilterComponent,
    PopoverComponent
  ],
  exports: [
    FabComponent,
    PopfilterComponent,
    PopoverComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class ComponentsModule { }
