import { NgModule } from '@angular/core';
import { FiltroPipe } from './filtro.pipe';
import { FiltrosVacantPipe } from './filtros-vacant.pipe';



@NgModule({
  declarations: [FiltroPipe, FiltrosVacantPipe],
  exports: [FiltroPipe,FiltrosVacantPipe]
})
export class PipesModule { }
