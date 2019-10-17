import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'miperfil', loadChildren: './miperfil/miperfil.module#MiperfilPageModule' },
  { path: 'oportunidades', loadChildren: './oportunidades/oportunidades.module#OportunidadesPageModule' },
  { path: 'postulaciones', loadChildren: './postulaciones/postulaciones.module#PostulacionesPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
