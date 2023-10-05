import { Component } from '@angular/core';
import { ConexionApiService } from '../conexion-api/conexion-api.service';
import { Router } from '@angular/router';
import { ComunicacionService } from '../comunicacion-servicio/comunicacion.service';



@Component({
  selector: 'app-seleccion-partido',
  templateUrl: './seleccion-partido.component.html',
  styleUrls: ['./seleccion-partido.component.css']
})
export class SeleccionPartidoComponent {
  constructor(private servicioComunicacion: ComunicacionService,private router:Router,private conexionAPI:ConexionApiService) { }
  partidos:any[]=[];
  partidoSeleccionado:number=0;
  array_apuestas_seleccionadas:any[]=[];
  array_apuestas_seleccionadas_tabla:any[]=[];
  elemento_texto_apuestas_seleccionadas_imprimir=""
  ngOnInit(){
    this.obtenerPartidos();
    this.array_apuestas_seleccionadas=this.servicioComunicacion.getArrayApuestasSeleccionadas()
    
    this.array_apuestas_seleccionadas.forEach(elemento=>{
      this.elemento_texto_apuestas_seleccionadas_imprimir+=elemento+"\n"
      var separado=elemento.split("\t");
      this.array_apuestas_seleccionadas_tabla.push(separado)
    })
    console.log(this.elemento_texto_apuestas_seleccionadas_imprimir)
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
