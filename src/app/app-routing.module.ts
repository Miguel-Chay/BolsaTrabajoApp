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
  { path: 'postulaciones', loadChildren: './postulaciones/postulaciones.module#PostulacionesPageModule' },  { path: 'olvido-contrasenia', loadChildren: './olvido-contrasenia/olvido-contrasenia.module#OlvidoContraseniaPageModule' },
  { path: 'vacantes', loadChildren: './vacantes/vacantes.module#VacantesPageModule' },
  { path: 'inicio-perfil-basico', loadChildren: './inicio-perfil-basico/inicio-perfil-basico.module#InicioPerfilBasicoPageModule' },
  { path: 'agregar-exp-laboral', loadChildren: './agregar-exp-laboral/agregar-exp-laboral.module#AgregarExpLaboralPageModule' },
  { path: 'agregar-form-academica', loadChildren: './agregar-form-academica/agregar-form-academica.module#AgregarFormAcademicaPageModule' },
  { path: 'agregar-curso', loadChildren: './agregar-curso/agregar-curso.module#AgregarCursoPageModule' },
  { path: 'agregar-certificacion', loadChildren: './agregar-certificacion/agregar-certificacion.module#AgregarCertificacionPageModule' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
