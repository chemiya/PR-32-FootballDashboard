import { Component } from '@angular/core';
import { ConexionApiService } from '../conexion-api/conexion-api.service';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ActivatedRoute } from '@angular/router';

Chart.register(...registerables);
Chart.register(ChartDataLabels);

@Component({
  selector: 'app-datos-partido',
  templateUrl: './datos-partido.component.html',
  styleUrls: ['./datos-partido.component.css']
})
export class DatosPartidoComponent {
  datosPartido: any[] = []
  chartGoles: any
  chartHandicap:any
  chartGolesLocal:any
  chartGolesVisitante:any
  array_porcentajes_goles_mas: number[] = [0, 0, 0, 0, 0]
  array_porcentajes_goles_menos: number[] = [0, 0, 0, 0, 0]

  array_porcentajes_goles_local_mas: number[] = [0, 0, 0]
  array_porcentajes_goles_local_menos: number[] = [0, 0, 0]

  array_porcentajes_goles_visitante_mas: number[] = [0, 0, 0]
  array_porcentajes_goles_visitante_menos: number[] = [0, 0, 0]

  array_porcentajes_handicap_mas: number[] = [0, 0, 0, 0, 0]
  array_porcentajes_handicap_menos: number[] = [0, 0, 0, 0, 0]
  
  array_porcentajes_mas15: number[] = [0, 0, 0, 0, 0]
  array_porcentajes_menos15: number[] = [0, 0, 0, 0, 0]
  array_porcentajes_mas25: number[] = [0, 0, 0, 0, 0]
  array_porcentajes_menos25: number[] = [0, 0, 0, 0, 0]
  array_porcentajes_mas35: number[] = [0, 0, 0, 0, 0]
  array_porcentajes_menos35: number[] = [0, 0, 0, 0, 0]
  array_porcentajes_mas45: number[] = [0, 0, 0, 0, 0]
  array_porcentajes_menos45: number[] = [0, 0, 0, 0, 0]
  array_porcentajes_ambos_marcan: number[] = [0, 0, 0, 0, 0]
  array_porcentajes_ambos_no_marcan: number[] = [0, 0, 0, 0, 0]

  array_porcentajes_handicap_mas05_local: number[] = [0, 0, 0, 0, 0]
  array_porcentajes_handicap_mas05_visitante: number[] = [0, 0, 0, 0, 0]
  array_porcentajes_handicap_mas15_local: number[] = [0, 0, 0, 0, 0]
  array_porcentajes_handicap_mas15_visitante: number[] = [0, 0, 0, 0, 0]
  array_porcentajes_handicap_menos05_local: number[] = [0, 0, 0, 0, 0]
  array_porcentajes_handicap_menos05_visitante: number[] = [0, 0, 0, 0, 0]
  array_porcentajes_handicap_menos15_local: number[] = [0, 0, 0, 0, 0]
  array_porcentajes_handicap_menos15_visitante: number[] = [0, 0, 0, 0, 0]
  array_porcentajes_empate: number[] = [0, 0, 0, 0, 0]
  array_porcentajes_no_empate: number[] = [0, 0, 0, 0, 0]

  array_porcentajes_mas05_local: number[] = [0, 0, 0, 0, 0]
  array_porcentajes_menos05_local: number[] = [0, 0, 0, 0, 0]
  array_porcentajes_mas05_visitante: number[] = [0, 0, 0, 0, 0]
  array_porcentajes_menos05_visitante: number[] = [0, 0, 0, 0, 0]
  array_porcentajes_mas15_local: number[] = [0, 0, 0, 0, 0]
  array_porcentajes_menos15_local: number[] = [0, 0, 0, 0, 0]
  array_porcentajes_mas15_visitante: number[] = [0, 0, 0, 0, 0]
  array_porcentajes_menos15_visitante: number[] = [0, 0, 0, 0, 0]
  array_porcentajes_mas25_local: number[] = [0, 0, 0, 0, 0]
  array_porcentajes_menos25_local: number[] = [0, 0, 0, 0, 0]
  array_porcentajes_mas25_visitante: number[] = [0, 0, 0, 0, 0]
  array_porcentajes_menos25_visitante: number[] = [0, 0, 0, 0, 0]
  constructor(private route: ActivatedRoute, private conexionAPI: ConexionApiService) { }

  ngOnInit() {
    this.getDatosPartido(this.route.snapshot.params["id"]);//busco los datos concretos

  }

  getDatosPartido(id: any) {
    this.conexionAPI.getDatosPartido(id)
      .subscribe({
        next: (data) => {

          this.datosPartido = data
          console.log(this.datosPartido)

          for (var i = 0; i < this.datosPartido.length; i++) {
            if (this.datosPartido[i].mercado == "mas 1,5") {
              this.array_porcentajes_mas15[0] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_sitio.replace(',', '.'))
              this.array_porcentajes_mas15[1] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_general.replace(',', '.'))
              this.array_porcentajes_mas15[2] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_4_sitio.replace(',', '.'))
              this.array_porcentajes_mas15[3] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_8_general.replace(',', '.'))
              this.array_porcentajes_mas15[4] = parseFloat(this.datosPartido[i].porcentaje_mercado_media.replace(',', '.'))


            }
            if (this.datosPartido[i].mercado == "menos 1,5") {
              this.array_porcentajes_menos15[0] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_sitio.replace(',', '.'))
              this.array_porcentajes_menos15[1] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_general.replace(',', '.'))
              this.array_porcentajes_menos15[2] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_4_sitio.replace(',', '.'))
              this.array_porcentajes_menos15[3] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_8_general.replace(',', '.'))
              this.array_porcentajes_menos15[4] = parseFloat(this.datosPartido[i].porcentaje_mercado_media.replace(',', '.'))
            }

            if (this.datosPartido[i].mercado == "mas 2,5") {
              this.array_porcentajes_mas25[0] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_sitio.replace(',', '.'))
              this.array_porcentajes_mas25[1] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_general.replace(',', '.'))
              this.array_porcentajes_mas25[2] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_4_sitio.replace(',', '.'))
              this.array_porcentajes_mas25[3] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_8_general.replace(',', '.'))
              this.array_porcentajes_mas25[4] = parseFloat(this.datosPartido[i].porcentaje_mercado_media.replace(',', '.'))
            }
            if (this.datosPartido[i].mercado == "menos 2,5") {

              this.array_porcentajes_menos25[0] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_sitio.replace(',', '.'))
              this.array_porcentajes_menos25[1] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_general.replace(',', '.'))
              this.array_porcentajes_menos25[2] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_4_sitio.replace(',', '.'))
              this.array_porcentajes_menos25[3] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_8_general.replace(',', '.'))
              this.array_porcentajes_menos25[4] = parseFloat(this.datosPartido[i].porcentaje_mercado_media.replace(',', '.'))
            }

            if (this.datosPartido[i].mercado == "mas 3,5") {
              this.array_porcentajes_mas35[0] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_sitio.replace(',', '.'))
              this.array_porcentajes_mas35[1] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_general.replace(',', '.'))
              this.array_porcentajes_mas35[2] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_4_sitio.replace(',', '.'))
              this.array_porcentajes_mas35[3] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_8_general.replace(',', '.'))
              this.array_porcentajes_mas35[4] = parseFloat(this.datosPartido[i].porcentaje_mercado_media.replace(',', '.'))
            }
            if (this.datosPartido[i].mercado == "menos 3,5") {
              this.array_porcentajes_menos35[0] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_sitio.replace(',', '.'))
              this.array_porcentajes_menos35[1] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_general.replace(',', '.'))
              this.array_porcentajes_menos35[2] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_4_sitio.replace(',', '.'))
              this.array_porcentajes_menos35[3] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_8_general.replace(',', '.'))
              this.array_porcentajes_menos35[4] = parseFloat(this.datosPartido[i].porcentaje_mercado_media.replace(',', '.'))
            }

            if (this.datosPartido[i].mercado == "mas 4,5") {
              this.array_porcentajes_mas45[0] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_sitio.replace(',', '.'))
              this.array_porcentajes_mas45[1] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_general.replace(',', '.'))
              this.array_porcentajes_mas45[2] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_4_sitio.replace(',', '.'))
              this.array_porcentajes_mas45[3] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_8_general.replace(',', '.'))
              this.array_porcentajes_mas45[4] = parseFloat(this.datosPartido[i].porcentaje_mercado_media.replace(',', '.'))
            }
            if (this.datosPartido[i].mercado == "menos 4,5") {
              this.array_porcentajes_menos45[0] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_sitio.replace(',', '.'))
              this.array_porcentajes_menos45[1] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_general.replace(',', '.'))
              this.array_porcentajes_menos45[2] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_4_sitio.replace(',', '.'))
              this.array_porcentajes_menos45[3] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_8_general.replace(',', '.'))
              this.array_porcentajes_menos45[4] = parseFloat(this.datosPartido[i].porcentaje_mercado_media.replace(',', '.'))
            }

            if (this.datosPartido[i].mercado == "ambos marcan") {
              this.array_porcentajes_ambos_marcan[0] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_sitio.replace(',', '.'))
              this.array_porcentajes_ambos_marcan[1] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_general.replace(',', '.'))
              this.array_porcentajes_ambos_marcan[2] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_4_sitio.replace(',', '.'))
              this.array_porcentajes_ambos_marcan[3] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_8_general.replace(',', '.'))
              this.array_porcentajes_ambos_marcan[4] = parseFloat(this.datosPartido[i].porcentaje_mercado_media.replace(',', '.'))
            }
            if (this.datosPartido[i].mercado == "ambos no marcan") {
              this.array_porcentajes_ambos_no_marcan[0] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_sitio.replace(',', '.'))
              this.array_porcentajes_ambos_no_marcan[1] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_general.replace(',', '.'))
              this.array_porcentajes_ambos_no_marcan[2] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_4_sitio.replace(',', '.'))
              this.array_porcentajes_ambos_no_marcan[3] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_8_general.replace(',', '.'))
              this.array_porcentajes_ambos_no_marcan[4] = parseFloat(this.datosPartido[i].porcentaje_mercado_media.replace(',', '.'))
            }

            if (this.datosPartido[i].mercado == "no empate") {
              this.array_porcentajes_no_empate[0] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_sitio.replace(',', '.'))
              this.array_porcentajes_no_empate[1] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_general.replace(',', '.'))
              this.array_porcentajes_no_empate[2] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_4_sitio.replace(',', '.'))
              this.array_porcentajes_no_empate[3] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_8_general.replace(',', '.'))
              this.array_porcentajes_no_empate[4] = parseFloat(this.datosPartido[i].porcentaje_mercado_media.replace(',', '.'))
            }

            if (this.datosPartido[i].mercado == "empate") {
              this.array_porcentajes_empate[0] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_sitio.replace(',', '.'))
              this.array_porcentajes_empate[1] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_general.replace(',', '.'))
              this.array_porcentajes_empate[2] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_4_sitio.replace(',', '.'))
              this.array_porcentajes_empate[3] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_8_general.replace(',', '.'))
              this.array_porcentajes_empate[4] = parseFloat(this.datosPartido[i].porcentaje_mercado_media.replace(',', '.'))
            }


            if (this.datosPartido[i].mercado == "handicap +0,5 local") {
              this.array_porcentajes_handicap_mas05_local[0] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_sitio.replace(',', '.'))
              this.array_porcentajes_handicap_mas05_local[1] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_general.replace(',', '.'))
              this.array_porcentajes_handicap_mas05_local[2] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_4_sitio.replace(',', '.'))
              this.array_porcentajes_handicap_mas05_local[3] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_8_general.replace(',', '.'))
              this.array_porcentajes_handicap_mas05_local[4] = parseFloat(this.datosPartido[i].porcentaje_mercado_media.replace(',', '.'))
            }

            if (this.datosPartido[i].mercado == "handicap +0,5 visitante") {
              this.array_porcentajes_handicap_mas05_visitante[0] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_sitio.replace(',', '.'))
              this.array_porcentajes_handicap_mas05_visitante[1] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_general.replace(',', '.'))
              this.array_porcentajes_handicap_mas05_visitante[2] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_4_sitio.replace(',', '.'))
              this.array_porcentajes_handicap_mas05_visitante[3] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_8_general.replace(',', '.'))
              this.array_porcentajes_handicap_mas05_visitante[4] = parseFloat(this.datosPartido[i].porcentaje_mercado_media.replace(',', '.'))
            }

            if (this.datosPartido[i].mercado == "handicap -0,5 local") {
              this.array_porcentajes_handicap_menos05_local[0] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_sitio.replace(',', '.'))
              this.array_porcentajes_handicap_menos05_local[1] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_general.replace(',', '.'))
              this.array_porcentajes_handicap_menos05_local[2] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_4_sitio.replace(',', '.'))
              this.array_porcentajes_handicap_menos05_local[3] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_8_general.replace(',', '.'))
              this.array_porcentajes_handicap_menos05_local[4] = parseFloat(this.datosPartido[i].porcentaje_mercado_media.replace(',', '.'))
            }

            if (this.datosPartido[i].mercado == "handicap -0,5 visitante") {
              this.array_porcentajes_handicap_menos05_visitante[0] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_sitio.replace(',', '.'))
              this.array_porcentajes_handicap_menos05_visitante[1] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_general.replace(',', '.'))
              this.array_porcentajes_handicap_menos05_visitante[2] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_4_sitio.replace(',', '.'))
              this.array_porcentajes_handicap_menos05_visitante[3] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_8_general.replace(',', '.'))
              this.array_porcentajes_handicap_menos05_visitante[4] = parseFloat(this.datosPartido[i].porcentaje_mercado_media.replace(',', '.'))
            }

            if (this.datosPartido[i].mercado == "handicap +1,5 local") {
              this.array_porcentajes_handicap_mas15_local[0] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_sitio.replace(',', '.'))
              this.array_porcentajes_handicap_mas15_local[1] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_general.replace(',', '.'))
              this.array_porcentajes_handicap_mas15_local[2] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_4_sitio.replace(',', '.'))
              this.array_porcentajes_handicap_mas15_local[3] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_8_general.replace(',', '.'))
              this.array_porcentajes_handicap_mas15_local[4] = parseFloat(this.datosPartido[i].porcentaje_mercado_media.replace(',', '.'))
            }

            if (this.datosPartido[i].mercado == "handicap +1,5 visitante") {
              this.array_porcentajes_handicap_mas15_visitante[0] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_sitio.replace(',', '.'))
              this.array_porcentajes_handicap_mas15_visitante[1] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_general.replace(',', '.'))
              this.array_porcentajes_handicap_mas15_visitante[2] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_4_sitio.replace(',', '.'))
              this.array_porcentajes_handicap_mas15_visitante[3] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_8_general.replace(',', '.'))
              this.array_porcentajes_handicap_mas15_visitante[4] = parseFloat(this.datosPartido[i].porcentaje_mercado_media.replace(',', '.'))
            }

            if (this.datosPartido[i].mercado == "handicap -1,5 local") {
              this.array_porcentajes_handicap_menos15_local[0] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_sitio.replace(',', '.'))
              this.array_porcentajes_handicap_menos15_local[1] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_general.replace(',', '.'))
              this.array_porcentajes_handicap_menos15_local[2] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_4_sitio.replace(',', '.'))
              this.array_porcentajes_handicap_menos15_local[3] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_8_general.replace(',', '.'))
              this.array_porcentajes_handicap_menos15_local[4] = parseFloat(this.datosPartido[i].porcentaje_mercado_media.replace(',', '.'))
            }

            if (this.datosPartido[i].mercado == "handicap -1,5 visitante") {
              this.array_porcentajes_handicap_menos15_visitante[0] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_sitio.replace(',', '.'))
              this.array_porcentajes_handicap_menos15_visitante[1] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_general.replace(',', '.'))
              this.array_porcentajes_handicap_menos15_visitante[2] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_4_sitio.replace(',', '.'))
              this.array_porcentajes_handicap_menos15_visitante[3] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_8_general.replace(',', '.'))
              this.array_porcentajes_handicap_menos15_visitante[4] = parseFloat(this.datosPartido[i].porcentaje_mercado_media.replace(',', '.'))
            }

            if (this.datosPartido[i].mercado == "mas 0,5 local") {
              this.array_porcentajes_mas05_local[0] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_sitio.replace(',', '.'))
              this.array_porcentajes_mas05_local[1] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_general.replace(',', '.'))
              this.array_porcentajes_mas05_local[2] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_4_sitio.replace(',', '.'))
              this.array_porcentajes_mas05_local[3] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_8_general.replace(',', '.'))
              this.array_porcentajes_mas05_local[4] = parseFloat(this.datosPartido[i].porcentaje_mercado_media.replace(',', '.'))
            }

            if (this.datosPartido[i].mercado == "mas 0,5 visitante") {
              this.array_porcentajes_mas05_visitante[0] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_sitio.replace(',', '.'))
              this.array_porcentajes_mas05_visitante[1] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_general.replace(',', '.'))
              this.array_porcentajes_mas05_visitante[2] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_4_sitio.replace(',', '.'))
              this.array_porcentajes_mas05_visitante[3] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_8_general.replace(',', '.'))
              this.array_porcentajes_mas05_visitante[4] = parseFloat(this.datosPartido[i].porcentaje_mercado_media.replace(',', '.'))
            }

            if (this.datosPartido[i].mercado == "mas 1,5 local") {
              this.array_porcentajes_mas15_local[0] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_sitio.replace(',', '.'))
              this.array_porcentajes_mas15_local[1] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_general.replace(',', '.'))
              this.array_porcentajes_mas15_local[2] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_4_sitio.replace(',', '.'))
              this.array_porcentajes_mas15_local[3] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_8_general.replace(',', '.'))
              this.array_porcentajes_mas15_local[4] = parseFloat(this.datosPartido[i].porcentaje_mercado_media.replace(',', '.'))
            }

            if (this.datosPartido[i].mercado == "mas 1,5 visitante") {
              this.array_porcentajes_mas15_visitante[0] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_sitio.replace(',', '.'))
              this.array_porcentajes_mas15_visitante[1] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_general.replace(',', '.'))
              this.array_porcentajes_mas15_visitante[2] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_4_sitio.replace(',', '.'))
              this.array_porcentajes_mas15_visitante[3] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_8_general.replace(',', '.'))
              this.array_porcentajes_mas15_visitante[4] = parseFloat(this.datosPartido[i].porcentaje_mercado_media.replace(',', '.'))
            }

            if (this.datosPartido[i].mercado == "mas 2,5 local") {
              this.array_porcentajes_mas25_local[0] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_sitio.replace(',', '.'))
              this.array_porcentajes_mas25_local[1] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_general.replace(',', '.'))
              this.array_porcentajes_mas25_local[2] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_4_sitio.replace(',', '.'))
              this.array_porcentajes_mas25_local[3] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_8_general.replace(',', '.'))
              this.array_porcentajes_mas25_local[4] = parseFloat(this.datosPartido[i].porcentaje_mercado_media.replace(',', '.'))
            }

            if (this.datosPartido[i].mercado == "mas 2,5 visitante") {
              this.array_porcentajes_mas25_visitante[0] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_sitio.replace(',', '.'))
              this.array_porcentajes_mas25_visitante[1] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_general.replace(',', '.'))
              this.array_porcentajes_mas25_visitante[2] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_4_sitio.replace(',', '.'))
              this.array_porcentajes_mas25_visitante[3] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_8_general.replace(',', '.'))
              this.array_porcentajes_mas25_visitante[4] = parseFloat(this.datosPartido[i].porcentaje_mercado_media.replace(',', '.'))
            }

            if (this.datosPartido[i].mercado == "menos 0,5 local") {
              this.array_porcentajes_menos05_local[0] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_sitio.replace(',', '.'))
              this.array_porcentajes_menos05_local[1] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_general.replace(',', '.'))
              this.array_porcentajes_menos05_local[2] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_4_sitio.replace(',', '.'))
              this.array_porcentajes_menos05_local[3] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_8_general.replace(',', '.'))
              this.array_porcentajes_menos05_local[4] = parseFloat(this.datosPartido[i].porcentaje_mercado_media.replace(',', '.'))
            }

            if (this.datosPartido[i].mercado == "menos 0,5 visitante") {
              this.array_porcentajes_menos05_visitante[0] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_sitio.replace(',', '.'))
              this.array_porcentajes_menos05_visitante[1] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_general.replace(',', '.'))
              this.array_porcentajes_menos05_visitante[2] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_4_sitio.replace(',', '.'))
              this.array_porcentajes_menos05_visitante[3] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_8_general.replace(',', '.'))
              this.array_porcentajes_menos05_visitante[4] = parseFloat(this.datosPartido[i].porcentaje_mercado_media.replace(',', '.'))
            }

            if (this.datosPartido[i].mercado == "menos 1,5 local") {
              this.array_porcentajes_menos15_local[0] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_sitio.replace(',', '.'))
              this.array_porcentajes_menos15_local[1] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_general.replace(',', '.'))
              this.array_porcentajes_menos15_local[2] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_4_sitio.replace(',', '.'))
              this.array_porcentajes_menos15_local[3] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_8_general.replace(',', '.'))
              this.array_porcentajes_menos15_local[4] = parseFloat(this.datosPartido[i].porcentaje_mercado_media.replace(',', '.'))
            }

            if (this.datosPartido[i].mercado == "menos 1,5 visitante") {
              this.array_porcentajes_menos15_visitante[0] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_sitio.replace(',', '.'))
              this.array_porcentajes_menos15_visitante[1] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_general.replace(',', '.'))
              this.array_porcentajes_menos15_visitante[2] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_4_sitio.replace(',', '.'))
              this.array_porcentajes_menos15_visitante[3] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_8_general.replace(',', '.'))
              this.array_porcentajes_menos15_visitante[4] = parseFloat(this.datosPartido[i].porcentaje_mercado_media.replace(',', '.'))
            }

            if (this.datosPartido[i].mercado == "menos 2,5 local") {
              this.array_porcentajes_menos25_local[0] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_sitio.replace(',', '.'))
              this.array_porcentajes_menos25_local[1] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_general.replace(',', '.'))
              this.array_porcentajes_menos25_local[2] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_4_sitio.replace(',', '.'))
              this.array_porcentajes_menos25_local[3] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_8_general.replace(',', '.'))
              this.array_porcentajes_menos25_local[4] = parseFloat(this.datosPartido[i].porcentaje_mercado_media.replace(',', '.'))
            }

            if (this.datosPartido[i].mercado == "menos 2,5 visitante") {
              this.array_porcentajes_menos25_visitante[0] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_sitio.replace(',', '.'))
              this.array_porcentajes_menos25_visitante[1] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_general.replace(',', '.'))
              this.array_porcentajes_menos25_visitante[2] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_4_sitio.replace(',', '.'))
              this.array_porcentajes_menos25_visitante[3] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_8_general.replace(',', '.'))
              this.array_porcentajes_menos25_visitante[4] = parseFloat(this.datosPartido[i].porcentaje_mercado_media.replace(',', '.'))
            }



          }






          this.crearGraficoHandicap()
          this.crearGraficoGoles()
          this.crearGraficoGolesLocal()
          this.crearGraficoGolesVisitante()

        },
        error: (e) => console.error(e)
      });
  }

  crearGraficoHandicap() {
    this.array_porcentajes_handicap_mas[0] = this.array_porcentajes_handicap_mas15_local[4]
    this.array_porcentajes_handicap_mas[1] = this.array_porcentajes_handicap_mas05_local[4]
    this.array_porcentajes_handicap_mas[2] = this.array_porcentajes_empate[4]
    this.array_porcentajes_handicap_mas[3] = this.array_porcentajes_handicap_mas05_visitante[4]
    this.array_porcentajes_handicap_mas[4] = this.array_porcentajes_handicap_mas15_visitante[4]
    this.array_porcentajes_handicap_menos[0] = this.array_porcentajes_handicap_menos15_visitante[4]
    this.array_porcentajes_handicap_menos[1] = this.array_porcentajes_handicap_menos05_visitante[4]
    this.array_porcentajes_handicap_menos[2] = this.array_porcentajes_no_empate[4]
    this.array_porcentajes_handicap_menos[3] = this.array_porcentajes_handicap_menos05_local[4]
    this.array_porcentajes_handicap_menos[4] = this.array_porcentajes_handicap_menos15_local[4]

    this.chartHandicap = new Chart("graficoHandicap", {
      type: 'bar',
      data: {
        labels: ['Ha +1,5 local y ha -1,5 visitante', 'Ha +0,5 local y ha -0,5 visitante', 'Empate y no empate', 'Ha +0,5 visitante y ha -0,5 local', 'Ha +1,5 visitante y ha -1,5 local'],
        datasets: [{
          label: 'Mas',
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          data: this.array_porcentajes_handicap_mas
        },
        {
          label: 'Menos',
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
          data: this.array_porcentajes_handicap_menos
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            stacked: true
          },
          y: {
            stacked: true
          }

        },
        plugins: {

          datalabels: {
            anchor: 'center',
            align: 'center',
            font: {
              size: 12
            }
          }
        }
      }
    });
  }



  crearGraficoGoles() {
    this.array_porcentajes_goles_mas[0] = this.array_porcentajes_mas15[4]
    this.array_porcentajes_goles_mas[1] = this.array_porcentajes_mas25[4]
    this.array_porcentajes_goles_mas[2] = this.array_porcentajes_mas35[4]
    this.array_porcentajes_goles_mas[3] = this.array_porcentajes_mas45[4]
    this.array_porcentajes_goles_mas[4] = this.array_porcentajes_ambos_marcan[4]
    this.array_porcentajes_goles_menos[0] = this.array_porcentajes_menos15[4]
    this.array_porcentajes_goles_menos[1] = this.array_porcentajes_menos25[4]
    this.array_porcentajes_goles_menos[2] = this.array_porcentajes_menos35[4]
    this.array_porcentajes_goles_menos[3] = this.array_porcentajes_menos45[4]
    this.array_porcentajes_goles_menos[4] = this.array_porcentajes_ambos_no_marcan[4]

    this.chartGoles = new Chart("graficoGoles", {
      type: 'bar',
      data: {
        labels: ['Mas/menos 1,5 goles', 'Mas/menos 2,5 goles', 'Mas/menos 3,5 goles', 'Mas/menos 4,5 goles', 'Ambos si/no marcan'],
        datasets: [{
          label: 'Mas',
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          data: this.array_porcentajes_goles_mas
        },
        {
          label: 'Menos',
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
          data: this.array_porcentajes_goles_menos
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            stacked: true
          },
          y: {
            stacked: true
          }

        },
        plugins: {

          datalabels: {
            anchor: 'center',
            align: 'center',
            font: {
              size: 12
            }
          }
        }
      }
    });
  }

  crearGraficoGolesLocal() {
    this.array_porcentajes_goles_local_mas[0] = this.array_porcentajes_mas05_local[4]
    this.array_porcentajes_goles_local_mas[1] = this.array_porcentajes_mas15_local[4]
    this.array_porcentajes_goles_local_mas[2] = this.array_porcentajes_mas25_local[4]

    this.array_porcentajes_goles_local_menos[0] = this.array_porcentajes_menos05_local[4]
    this.array_porcentajes_goles_local_menos[1] = this.array_porcentajes_menos15_local[4]
    this.array_porcentajes_goles_local_menos[2] = this.array_porcentajes_menos25_local[4]


    this.chartGolesLocal = new Chart("graficoGolesLocal", {
      type: 'bar',
      data: {
        labels: ['Mas/menos 0,5 goles', 'Mas/menos 1,5 goles', 'Mas/menos 2,5 goles'],
        datasets: [{
          label: 'Mas',
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          data: this.array_porcentajes_goles_local_mas
        },
        {
          label: 'Menos',
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
          data: this.array_porcentajes_goles_local_menos
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            stacked: true
          },
          y: {
            stacked: true
          }

        },
        plugins: {

          datalabels: {
            anchor: 'center',
            align: 'center',
            font: {
              size: 12
            }
          }
        }
      }
    });
  }

  crearGraficoGolesVisitante() {
    this.array_porcentajes_goles_visitante_mas[0] = this.array_porcentajes_mas05_visitante[4]
    this.array_porcentajes_goles_visitante_mas[1] = this.array_porcentajes_mas15_visitante[4]
    this.array_porcentajes_goles_visitante_mas[2] = this.array_porcentajes_mas25_visitante[4]

    this.array_porcentajes_goles_visitante_menos[0] = this.array_porcentajes_menos05_visitante[4]
    this.array_porcentajes_goles_visitante_menos[1] = this.array_porcentajes_menos15_visitante[4]
    this.array_porcentajes_goles_visitante_menos[2] = this.array_porcentajes_menos25_visitante[4]

    this.chartGolesVisitante = new Chart("graficoGolesVisitante", {
      type: 'bar',
      data: {
        labels: ['Mas/menos 0,5 goles', 'Mas/menos 1,5 goles', 'Mas/menos 2,5 goles'],
        datasets: [{
          label: 'Mas',
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          data: this.array_porcentajes_goles_visitante_mas
        },
        {
          label: 'Menos',
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
          data: this.array_porcentajes_goles_visitante_menos
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            stacked: true
          },
          y: {
            stacked: true
          }

        },
        plugins: {

          datalabels: {
            anchor: 'center',
            align: 'center',
            font: {
              size: 12
            }
          }
        }
      }
    });
  }



}
