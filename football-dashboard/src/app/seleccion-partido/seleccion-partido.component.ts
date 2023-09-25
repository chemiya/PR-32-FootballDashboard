import { Component } from '@angular/core';
import { ConexionApiService } from '../conexion-api/conexion-api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-seleccion-partido',
  templateUrl: './seleccion-partido.component.html',
  styleUrls: ['./seleccion-partido.component.css']
})
export class SeleccionPartidoComponent {
  constructor(private router:Router,private conexionAPI:ConexionApiService) { }
  partidos:any[]=[];
  partidoSeleccionado:number=0;
  ngOnInit(){
    this.obtenerPartidos();
  }




  obtenerPartidos(){
    this.conexionAPI.getPartidos()//busco todos
    .subscribe({
      next: (data) => {
        console.log(data)
        this.partidos=data;
      },
      error: (e) => console.error(e)
    });
  }




  
  cargarDatosPartido(){

    this.router.navigate(['/datosPartido/'+this.partidoSeleccionado]);
  }

}
