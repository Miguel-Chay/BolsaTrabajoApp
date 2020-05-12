import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'miperfil', loadChildren: './pages/miperfil/miperfil.module#MiperfilPageModule' },
  { path: 'oportunidades', loadChildren: './pages/oportunidades/oportunidades.module#OportunidadesPageModule' },
  { path: 'postulaciones', loadChildren: './pages/postulaciones/postulaciones.module#PostulacionesPageModule' },
  { path: 'olvido-contrasenia', loadChildren: './pages/olvido-contrasenia/olvido-contrasenia.module#OlvidoContraseniaPageModule' },
  { path: 'vacantes', loadChildren: './pages/vacantes/vacantes.module#VacantesPageModule' },
  { path: 'inicio-perfil-basico', loadChildren: './pages/inicio-perfil-basico/inicio-perfil-basico.module#InicioPerfilBasicoPageModule' },
  { path: 'agregar-exp-laboral', loadChildren: './pages/agregar-exp-laboral/agregar-exp-laboral.module#AgregarExpLaboralPageModule' },
  { path: 'agregar-form-academica', loadChildren: './pages/agregar-form-academica/agregar-form-academica.module#AgregarFormAcademicaPageModule' },
  { path: 'agregar-curso', loadChildren: './pages/agregar-curso/agregar-curso.module#AgregarCursoPageModule' },
  { path: 'agregar-certificacion', loadChildren: './pages/agregar-certificacion/agregar-certificacion.module#AgregarCertificacionPageModule' },
  { path: 'editar-perfil-basico', loadChildren: './pages/editar-perfil-basico/editar-perfil-basico.module#EditarPerfilBasicoPageModule' },
  { path: 'editar-cv', loadChildren: './pages/editar-cv/editar-cv.module#EditarCvPageModule' },
  { path: 'prueb', loadChildren: './pages/prueb/prueb.module#PruebPageModule' },
  { path: 'editar-exp-laboral/:id', loadChildren: './pages/editar-exp-laboral/editar-exp-laboral.module#EditarExpLaboralPageModule' },//pasa parametro id 
  




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
