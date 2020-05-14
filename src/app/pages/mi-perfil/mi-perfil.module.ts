import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MiPerfilPage } from './mi-perfil.page';

const routes: Routes = [
  {
    path:'',
    redirectTo:'/mi-perfil/mp-exp-laboral',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MiPerfilPage,
    children:[
      { 
        path: 'mp-exp-laboral',
        loadChildren: '../mp-exp-laboral/mp-exp-laboral.module#MpExpLaboralPageModule' 
      },
      { 
        path: 'mp-form-academica', 
        loadChildren: '../mp-form-academica/mp-form-academica.module#MpFormAcademicaPageModule' 
      },
      { 
        path: 'mp-cursos', 
        loadChildren: '../mp-cursos/mp-cursos.module#MpCursosPageModule' 
      },
      { 
        path: 'mp-certificaciones', 
        loadChildren: '../mp-certificaciones/mp-certificaciones.module#MpCertificacionesPageModule' 
      },
      { 
        path: 'mp-idiomas', 
        loadChildren: '../mp-idiomas/mp-idiomas.module#MpIdiomasPageModule' 
      },
      { 
        path: 'mp-aptitudes', 
        loadChildren: '../mp-aptitudes/mp-aptitudes.module#MpAptitudesPageModule' 
      },

    ]
  }
  
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MiPerfilPage]
})
export class MiPerfilPageModule {}
