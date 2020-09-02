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
  { path: 'inicio-perfil-basico', loadChildren: './pages/inicio-perfil-basico/inicio-perfil-basico.module#InicioPerfilBasicoPageModule' },
  { path: 'agregar-exp-laboral', loadChildren: './pages/agregar-exp-laboral/agregar-exp-laboral.module#AgregarExpLaboralPageModule' },
  { path: 'agregar-form-academica', loadChildren: './pages/agregar-form-academica/agregar-form-academica.module#AgregarFormAcademicaPageModule' },
  { path: 'agregar-curso', loadChildren: './pages/agregar-curso/agregar-curso.module#AgregarCursoPageModule' },
  { path: 'agregar-certificacion', loadChildren: './pages/agregar-certificacion/agregar-certificacion.module#AgregarCertificacionPageModule' },
  { path: 'editar-perfil-basico', loadChildren: './pages/editar-perfil-basico/editar-perfil-basico.module#EditarPerfilBasicoPageModule' },
  { path: 'editar-cv', loadChildren: './pages/editar-cv/editar-cv.module#EditarCvPageModule' },
  { path: 'prueb', loadChildren: './pages/prueb/prueb.module#PruebPageModule' },
  { path: 'editar-exp-laboral/:id', loadChildren: './pages/editar-exp-laboral/editar-exp-laboral.module#EditarExpLaboralPageModule' },//pasa parametro id,  
  { path: 'editar-curso/:id', loadChildren: './pages/editar-curso/editar-curso.module#EditarCursoPageModule' },
  { path: 'editar-idioma/:id', loadChildren: './pages/editar-idioma/editar-idioma.module#EditarIdiomaPageModule' },

  { path: 'vacantes', loadChildren: './pages/vacantes/vacantes.module#VacantesPageModule' },
  { path: 'vacante/:id', loadChildren: './pages/vacante/vacante.module#VacantePageModule' },
  
  { path: 'mi-perfil', loadChildren: './pages/mi-perfil/mi-perfil.module#MiPerfilPageModule' },
  { path: 'loading', loadChildren: './pages/loading/loading.module#LoadingPageModule' },
  { path: 'agregar-idioma', loadChildren: './pages/agregar-idioma/agregar-idioma.module#AgregarIdiomaPageModule' },
  { path: 'agregar-aptitud', loadChildren: './pages/agregar-aptitud/agregar-aptitud.module#AgregarAptitudPageModule' },
  { path: 'mensajes', loadChildren: './pages/mensajes/mensajes.module#MensajesPageModule' },
  { path: 'chats', loadChildren: './pages/chats/chats.module#ChatsPageModule' },
  { path: 'chat/:id', loadChildren: './pages/chat/chat.module#ChatPageModule' },
  { path: 'editar-certificacion/:id', loadChildren: './pages/editar-certificacion/editar-certificacion.module#EditarCertificacionPageModule' },
  { path: 'editar-aptitud/:id', loadChildren: './pages/editar-aptitud/editar-aptitud.module#EditarAptitudPageModule' }








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
export class AppRoutingModule {}
