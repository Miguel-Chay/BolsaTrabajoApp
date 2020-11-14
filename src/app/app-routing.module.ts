import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard'
import { NologinGuard } from './guards/nologin.guard'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule', canActivate: [NologinGuard] },
  { path: 'olvido-contrasenia', loadChildren: './pages/olvido-contrasenia/olvido-contrasenia.module#OlvidoContraseniaPageModule', canActivate: [NologinGuard] },

  { path: 'inicio-perfil-basico', loadChildren: './pages/inicio-perfil-basico/inicio-perfil-basico.module#InicioPerfilBasicoPageModule', canActivate: [AuthGuard] },
  { path: 'mi-perfil', loadChildren: './pages/mi-perfil/mi-perfil.module#MiPerfilPageModule', canActivate: [AuthGuard] },
  { path: 'oportunidades', loadChildren: './pages/oportunidades/oportunidades.module#OportunidadesPageModule', canActivate: [AuthGuard] },
  { path: 'postulaciones', loadChildren: './pages/postulaciones/postulaciones.module#PostulacionesPageModule', canActivate: [AuthGuard] },
  { path: 'vacantes', loadChildren: './pages/vacantes/vacantes.module#VacantesPageModule', canActivate: [AuthGuard] },
  { path: 'vacante/:from/:id', loadChildren: './pages/vacante/vacante.module#VacantePageModule', canActivate: [AuthGuard] },

  { path: 'agregar-curso', loadChildren: './pages/agregar-curso/agregar-curso.module#AgregarCursoPageModule', canActivate: [AuthGuard] },
  { path: 'agregar-idioma', loadChildren: './pages/agregar-idioma/agregar-idioma.module#AgregarIdiomaPageModule', canActivate: [AuthGuard] },
  { path: 'agregar-aptitud', loadChildren: './pages/agregar-aptitud/agregar-aptitud.module#AgregarAptitudPageModule', canActivate: [AuthGuard] },
  { path: 'agregar-exp-laboral', loadChildren: './pages/agregar-exp-laboral/agregar-exp-laboral.module#AgregarExpLaboralPageModule', canActivate: [AuthGuard] },
  { path: 'agregar-certificacion', loadChildren: './pages/agregar-certificacion/agregar-certificacion.module#AgregarCertificacionPageModule', canActivate: [AuthGuard] },
  { path: 'agregar-form-academica', loadChildren: './pages/agregar-form-academica/agregar-form-academica.module#AgregarFormAcademicaPageModule', canActivate: [AuthGuard] },

  { path: 'editar-cv', loadChildren: './pages/editar-cv/editar-cv.module#EditarCvPageModule', canActivate: [AuthGuard] },
  { path: 'editar-curso/:id', loadChildren: './pages/editar-curso/editar-curso.module#EditarCursoPageModule', canActivate: [AuthGuard] },
  { path: 'editar-idioma/:id', loadChildren: './pages/editar-idioma/editar-idioma.module#EditarIdiomaPageModule', canActivate: [AuthGuard] },
  { path: 'editar-aptitud/:id', loadChildren: './pages/editar-aptitud/editar-aptitud.module#EditarAptitudPageModule', canActivate: [AuthGuard] },
  { path: 'editar-perfil-basico', loadChildren: './pages/editar-perfil-basico/editar-perfil-basico.module#EditarPerfilBasicoPageModule', canActivate: [AuthGuard] },
  { path: 'editar-exp-laboral/:id', loadChildren: './pages/editar-exp-laboral/editar-exp-laboral.module#EditarExpLaboralPageModule', canActivate: [AuthGuard] },//pasa parametro id,  
  { path: 'editar-certificacion/:id', loadChildren: './pages/editar-certificacion/editar-certificacion.module#EditarCertificacionPageModule', canActivate: [AuthGuard] },

  { path: 'chats', loadChildren: './pages/chats/chats.module#ChatsPageModule', canActivate: [AuthGuard] },
  { path: 'chat/:id', loadChildren: './pages/chat/chat.module#ChatPageModule', canActivate: [AuthGuard] },

  { path: 'mensajes', loadChildren: './pages/mensajes/mensajes.module#MensajesPageModule', canActivate: [AuthGuard] },
  { path: 'loading', loadChildren: './pages/loading/loading.module#LoadingPageModule' },

  { path: 'miperfil', loadChildren: './pages/miperfil/miperfil.module#MiperfilPageModule', canActivate: [AuthGuard] },
  { path: 'prueb', loadChildren: './pages/prueb/prueb.module#PruebPageModule' },

  { path: 'form-academica/agregar', loadChildren: './pages/form-academica/form-academica.module#FormAcademicaPageModule', canActivate: [AuthGuard] },
  {
    path: 'form-academica/:id/editar',
    loadChildren: './pages/form-academica/form-academica.module#FormAcademicaPageModule', canActivate: [AuthGuard]
  }





  // { path: 'form-academica', loadChildren: './pages/form-academica/form-academica.module#FormAcademicaPageModule' },
  // { path: 'mp-certificaciones', loadChildren: './pages/mp-certificaciones/mp-certificaciones.module#MpCertificacionesPageModule' },
  // { path: 'mp-idiomas', loadChildren: './pages/mp-idiomas/mp-idiomas.module#MpIdiomasPageModule' },
  // { path: 'mp-aptitudes', loadChildren: './pages/mp-aptitudes/mp-aptitudes.module#MpAptitudesPageModule' },

  // { path: 'mp-exp-laboral', loadChildren: './pages/mp-exp-laboral/mp-exp-laboral.module#MpExpLaboralPageModule' },
  // { path: 'mp-form-academica', loadChildren: './pages/mp-form-academica/mp-form-academica.module#MpFormAcademicaPageModule' },
  // { path: 'mp-cursos', loadChildren: './pages/mp-cursos/mp-cursos.module#MpCursosPageModule' }




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
