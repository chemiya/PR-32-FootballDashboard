import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeleccionPartidoComponent } from './seleccion-partido/seleccion-partido.component';
import { DatosPartidoComponent } from './datos-partido/datos-partido.component';

const routes: Routes = [
  //ruta basica
  //ruta y al componente al que dirigen y editar con el id
  {path:'', component:SeleccionPartidoComponent},
  {path:'datosPartido/:id', component:DatosPartidoComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
