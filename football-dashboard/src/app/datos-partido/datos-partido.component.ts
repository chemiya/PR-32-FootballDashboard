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

  chartGoles: any
  chartHandicap: any
  chartGolesLocal: any
  chartGolesVisitante: any
  chartGraficoProporcionesPuntos: any
  chartGraficoProporcionesGoles: any
  chartGraficoProporcionesGolesLocal: any
  chartGraficoProporcionesGolesVisitante: any
  mercadoSeleccionado: any
  seleccionMercado = false;
  array_porcentajes_goles_mas: number[] = [0, 0, 0, 0, 0]
  array_porcentajes_goles_menos: number[] = [0, 0, 0, 0, 0]

  array_porcentajes_goles_local_mas: number[] = [0, 0, 0]
  array_porcentajes_goles_local_menos: number[] = [0, 0, 0]

  array_porcentajes_goles_visitante_mas: number[] = [0, 0, 0]
  array_porcentajes_goles_visitante_menos: number[] = [0, 0, 0]

  array_porcentajes_handicap_mas: number[] = [0, 0, 0, 0, 0]
  array_porcentajes_handicap_menos: number[] = [0, 0, 0, 0, 0]

  array_porcentajes_mas15: number[] = [0, 0, 0, 0, 0, 0, 0]
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
  array_proporciones_puntos: number[] = [0, 0, 0, 0, 0]
  array_proporciones_goles: number[] = [0, 0, 0, 0, 0]
  array_proporciones_goles_local: number[] = [0, 0, 0, 0, 0]
  array_proporciones_goles_visitante: number[] = [0, 0, 0, 0, 0]
  datosPartido: any;
  estadisticas_local: any;
  estadisticas_visitante: any
  clasificaciones: any;
  partidos_local_del_local: any;
  partidos_visitante_del_visitante: any
  partidos_total_del_local: any;
  partidos_total_del_visitante: any
  partidos_ultimos_8_local: any;
  partidos_ultimos_8_visitante: any;
  partidos_ultimos_4_local: any;
  partidos_ultimos_4_visitante: any;
  nombreLocal: any
  nombreVisitante: any
  constructor(private route: ActivatedRoute, private conexionAPI: ConexionApiService) { }

  ngOnInit() {
    this.getDatosPartido(this.route.snapshot.params["id"]);//busco los datos concretos

  }
















  //procesar datos
  getDatosPartido(id: any) {
    this.conexionAPI.getDatosPartido(id)
      .subscribe({
        next: (data) => {

          this.datosPartido = data
          this.estadisticas_local = this.datosPartido["estadisticas_local"]
          this.estadisticas_visitante = this.datosPartido["estadisticas_visitante"]
          this.clasificaciones = this.datosPartido["clasificaciones"]
          console.log(this.clasificaciones)
          this.datosPartido = this.datosPartido["apuestas_seleccionadas"]

          this.partidos_local_del_local = (this.estadisticas_local["partidosLocal"])
          this.partidos_visitante_del_visitante = (this.estadisticas_visitante["partidosVisitante"])
          this.partidos_total_del_local = (this.estadisticas_local["partidosTotal"])
          this.partidos_total_del_visitante = (this.estadisticas_visitante["partidosTotal"])
          this.partidos_ultimos_4_visitante = (this.estadisticas_visitante["partidosUltimos4Visitante"])
          this.partidos_ultimos_4_local = (this.estadisticas_local["partidosUltimos4Local"])
          this.partidos_ultimos_8_visitante = (this.estadisticas_visitante["partidosUltimos8Total"])
          this.partidos_ultimos_8_local = (this.estadisticas_local["partidosUltimos8Total"])
          this.nombreLocal = this.estadisticas_local["nombre"]
          this.nombreVisitante = this.estadisticas_visitante["nombre"]
          

          this.partidos_local_del_local.forEach((element: any) => {
            element.color = -1
          });
          this.partidos_visitante_del_visitante.forEach((element: any) => {
            element.color = -1
          });
          this.partidos_total_del_local.forEach((element: any) => {
            element.color = -1
          });
          this.partidos_total_del_visitante.forEach((element: any) => {
            element.color = -1
          });
          this.partidos_ultimos_4_local.forEach((element: any) => {
            element.color = -1
          });
          this.partidos_ultimos_4_visitante.forEach((element: any) => {
            element.color = -1
          });
          this.partidos_ultimos_8_local.forEach((element: any) => {
            element.color = -1
          });
          this.partidos_ultimos_8_visitante.forEach((element: any) => {
            element.color = -1
          });


          for (var i = 0; i < this.datosPartido.length; i++) {
            if (this.datosPartido[i].mercado == "mas 1,5") {
              this.array_porcentajes_mas15[0] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_sitio.replace(',', '.'))
              this.array_porcentajes_mas15[1] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_general.replace(',', '.'))
              this.array_porcentajes_mas15[2] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_4_sitio.replace(',', '.'))
              this.array_porcentajes_mas15[3] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_8_general.replace(',', '.'))
              this.array_porcentajes_mas15[4] = parseFloat(this.datosPartido[i].porcentaje_mercado_media.replace(',', '.'))
              this.array_porcentajes_mas15[5] = parseFloat(this.datosPartido[i].cuota_favor.replace(',', '.'))
              this.array_porcentajes_mas15[6] = parseFloat(this.datosPartido[i].valor.replace(',', '.'))

              this.array_proporciones_goles[0] = parseFloat(this.datosPartido[i].proporcion_relacionada_en_sitio.replace(',', '.'))
              this.array_proporciones_goles[1] = parseFloat(this.datosPartido[i].proporcion_relacionada_en_general.replace(',', '.'))
              this.array_proporciones_goles[2] = parseFloat(this.datosPartido[i].proporcion_relacionada_en_ultimos_4_sitio.replace(',', '.'))
              this.array_proporciones_goles[3] = parseFloat(this.datosPartido[i].proporcion_relacionada_en_ultimos_8_general.replace(',', '.'))
              this.array_proporciones_goles[4] = parseFloat(this.datosPartido[i].proporcion_relacionada_media.replace(',', '.'))

            }
            if (this.datosPartido[i].mercado == "menos 1,5") {
              this.array_porcentajes_menos15[0] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_sitio.replace(',', '.'))
              this.array_porcentajes_menos15[1] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_general.replace(',', '.'))
              this.array_porcentajes_menos15[2] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_4_sitio.replace(',', '.'))
              this.array_porcentajes_menos15[3] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_8_general.replace(',', '.'))
              this.array_porcentajes_menos15[4] = parseFloat(this.datosPartido[i].porcentaje_mercado_media.replace(',', '.'))
              this.array_porcentajes_menos15[5] = parseFloat(this.datosPartido[i].cuota_favor.replace(',', '.'))
              this.array_porcentajes_menos15[6] = parseFloat(this.datosPartido[i].valor.replace(',', '.'))

            }

            if (this.datosPartido[i].mercado == "mas 2,5") {
              this.array_porcentajes_mas25[0] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_sitio.replace(',', '.'))
              this.array_porcentajes_mas25[1] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_general.replace(',', '.'))
              this.array_porcentajes_mas25[2] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_4_sitio.replace(',', '.'))
              this.array_porcentajes_mas25[3] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_8_general.replace(',', '.'))
              this.array_porcentajes_mas25[4] = parseFloat(this.datosPartido[i].porcentaje_mercado_media.replace(',', '.'))
              this.array_porcentajes_mas25[5] = parseFloat(this.datosPartido[i].cuota_favor.replace(',', '.'))
              this.array_porcentajes_mas25[6] = parseFloat(this.datosPartido[i].valor.replace(',', '.'))

            }
            if (this.datosPartido[i].mercado == "menos 2,5") {

              this.array_porcentajes_menos25[0] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_sitio.replace(',', '.'))
              this.array_porcentajes_menos25[1] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_general.replace(',', '.'))
              this.array_porcentajes_menos25[2] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_4_sitio.replace(',', '.'))
              this.array_porcentajes_menos25[3] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_8_general.replace(',', '.'))
              this.array_porcentajes_menos25[4] = parseFloat(this.datosPartido[i].porcentaje_mercado_media.replace(',', '.'))
              this.array_porcentajes_menos25[5] = parseFloat(this.datosPartido[i].cuota_favor.replace(',', '.'))
              this.array_porcentajes_menos25[6] = parseFloat(this.datosPartido[i].valor.replace(',', '.'))

            }

            if (this.datosPartido[i].mercado == "mas 3,5") {
              this.array_porcentajes_mas35[0] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_sitio.replace(',', '.'))
              this.array_porcentajes_mas35[1] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_general.replace(',', '.'))
              this.array_porcentajes_mas35[2] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_4_sitio.replace(',', '.'))
              this.array_porcentajes_mas35[3] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_8_general.replace(',', '.'))
              this.array_porcentajes_mas35[4] = parseFloat(this.datosPartido[i].porcentaje_mercado_media.replace(',', '.'))
              this.array_porcentajes_mas35[5] = parseFloat(this.datosPartido[i].cuota_favor.replace(',', '.'))
              this.array_porcentajes_mas35[6] = parseFloat(this.datosPartido[i].valor.replace(',', '.'))

            }
            if (this.datosPartido[i].mercado == "menos 3,5") {
              this.array_porcentajes_menos35[0] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_sitio.replace(',', '.'))
              this.array_porcentajes_menos35[1] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_general.replace(',', '.'))
              this.array_porcentajes_menos35[2] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_4_sitio.replace(',', '.'))
              this.array_porcentajes_menos35[3] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_8_general.replace(',', '.'))
              this.array_porcentajes_menos35[4] = parseFloat(this.datosPartido[i].porcentaje_mercado_media.replace(',', '.'))
              this.array_porcentajes_menos35[5] = parseFloat(this.datosPartido[i].cuota_favor.replace(',', '.'))
              this.array_porcentajes_menos35[6] = parseFloat(this.datosPartido[i].valor.replace(',', '.'))

            }

            if (this.datosPartido[i].mercado == "mas 4,5") {
              this.array_porcentajes_mas45[0] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_sitio.replace(',', '.'))
              this.array_porcentajes_mas45[1] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_general.replace(',', '.'))
              this.array_porcentajes_mas45[2] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_4_sitio.replace(',', '.'))
              this.array_porcentajes_mas45[3] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_8_general.replace(',', '.'))
              this.array_porcentajes_mas45[4] = parseFloat(this.datosPartido[i].porcentaje_mercado_media.replace(',', '.'))
              this.array_porcentajes_mas45[5] = parseFloat(this.datosPartido[i].cuota_favor.replace(',', '.'))
              this.array_porcentajes_mas45[6] = parseFloat(this.datosPartido[i].valor.replace(',', '.'))

            }
            if (this.datosPartido[i].mercado == "menos 4,5") {
              this.array_porcentajes_menos45[0] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_sitio.replace(',', '.'))
              this.array_porcentajes_menos45[1] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_general.replace(',', '.'))
              this.array_porcentajes_menos45[2] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_4_sitio.replace(',', '.'))
              this.array_porcentajes_menos45[3] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_8_general.replace(',', '.'))
              this.array_porcentajes_menos45[4] = parseFloat(this.datosPartido[i].porcentaje_mercado_media.replace(',', '.'))
              this.array_porcentajes_menos45[5] = parseFloat(this.datosPartido[i].cuota_favor.replace(',', '.'))
              this.array_porcentajes_menos45[6] = parseFloat(this.datosPartido[i].valor.replace(',', '.'))

            }

            if (this.datosPartido[i].mercado == "ambos marcan") {
              this.array_porcentajes_ambos_marcan[0] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_sitio.replace(',', '.'))
              this.array_porcentajes_ambos_marcan[1] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_general.replace(',', '.'))
              this.array_porcentajes_ambos_marcan[2] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_4_sitio.replace(',', '.'))
              this.array_porcentajes_ambos_marcan[3] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_8_general.replace(',', '.'))
              this.array_porcentajes_ambos_marcan[4] = parseFloat(this.datosPartido[i].porcentaje_mercado_media.replace(',', '.'))
              this.array_porcentajes_ambos_marcan[5] = parseFloat(this.datosPartido[i].cuota_favor.replace(',', '.'))
              this.array_porcentajes_ambos_marcan[6] = parseFloat(this.datosPartido[i].valor.replace(',', '.'))

            }
            if (this.datosPartido[i].mercado == "ambos no marcan") {
              this.array_porcentajes_ambos_no_marcan[0] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_sitio.replace(',', '.'))
              this.array_porcentajes_ambos_no_marcan[1] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_general.replace(',', '.'))
              this.array_porcentajes_ambos_no_marcan[2] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_4_sitio.replace(',', '.'))
              this.array_porcentajes_ambos_no_marcan[3] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_8_general.replace(',', '.'))
              this.array_porcentajes_ambos_no_marcan[4] = parseFloat(this.datosPartido[i].porcentaje_mercado_media.replace(',', '.'))
              this.array_porcentajes_ambos_no_marcan[5] = parseFloat(this.datosPartido[i].cuota_favor.replace(',', '.'))
              this.array_porcentajes_ambos_no_marcan[6] = parseFloat(this.datosPartido[i].valor.replace(',', '.'))

            }

            if (this.datosPartido[i].mercado == "no empate") {
              this.array_porcentajes_no_empate[0] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_sitio.replace(',', '.'))
              this.array_porcentajes_no_empate[1] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_general.replace(',', '.'))
              this.array_porcentajes_no_empate[2] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_4_sitio.replace(',', '.'))
              this.array_porcentajes_no_empate[3] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_8_general.replace(',', '.'))
              this.array_porcentajes_no_empate[4] = parseFloat(this.datosPartido[i].porcentaje_mercado_media.replace(',', '.'))
              this.array_porcentajes_no_empate[5] = parseFloat(this.datosPartido[i].cuota_favor.replace(',', '.'))
              this.array_porcentajes_no_empate[6] = parseFloat(this.datosPartido[i].valor.replace(',', '.'))

            }

            if (this.datosPartido[i].mercado == "empate") {
              this.array_porcentajes_empate[0] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_sitio.replace(',', '.'))
              this.array_porcentajes_empate[1] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_general.replace(',', '.'))
              this.array_porcentajes_empate[2] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_4_sitio.replace(',', '.'))
              this.array_porcentajes_empate[3] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_8_general.replace(',', '.'))
              this.array_porcentajes_empate[4] = parseFloat(this.datosPartido[i].porcentaje_mercado_media.replace(',', '.'))
              this.array_porcentajes_empate[5] = parseFloat(this.datosPartido[i].cuota_favor.replace(',', '.'))
              this.array_porcentajes_empate[6] = parseFloat(this.datosPartido[i].valor.replace(',', '.'))

            }


            if (this.datosPartido[i].mercado == "handicap +0,5 local") {
              this.array_porcentajes_handicap_mas05_local[0] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_sitio.replace(',', '.'))
              this.array_porcentajes_handicap_mas05_local[1] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_general.replace(',', '.'))
              this.array_porcentajes_handicap_mas05_local[2] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_4_sitio.replace(',', '.'))
              this.array_porcentajes_handicap_mas05_local[3] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_8_general.replace(',', '.'))
              this.array_porcentajes_handicap_mas05_local[4] = parseFloat(this.datosPartido[i].porcentaje_mercado_media.replace(',', '.'))
              this.array_porcentajes_handicap_mas05_local[5] = parseFloat(this.datosPartido[i].cuota_favor.replace(',', '.'))
              this.array_porcentajes_handicap_mas05_local[6] = parseFloat(this.datosPartido[i].valor.replace(',', '.'))


              this.array_proporciones_puntos[0] = parseFloat(this.datosPartido[i].proporcion_relacionada_en_sitio.replace(',', '.'))
              this.array_proporciones_puntos[1] = parseFloat(this.datosPartido[i].proporcion_relacionada_en_general.replace(',', '.'))
              this.array_proporciones_puntos[2] = parseFloat(this.datosPartido[i].proporcion_relacionada_en_ultimos_4_sitio.replace(',', '.'))
              this.array_proporciones_puntos[3] = parseFloat(this.datosPartido[i].proporcion_relacionada_en_ultimos_8_general.replace(',', '.'))
              this.array_proporciones_puntos[4] = parseFloat(this.datosPartido[i].proporcion_relacionada_media.replace(',', '.'))

            }

            if (this.datosPartido[i].mercado == "handicap +0,5 visitante") {
              this.array_porcentajes_handicap_mas05_visitante[0] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_sitio.replace(',', '.'))
              this.array_porcentajes_handicap_mas05_visitante[1] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_general.replace(',', '.'))
              this.array_porcentajes_handicap_mas05_visitante[2] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_4_sitio.replace(',', '.'))
              this.array_porcentajes_handicap_mas05_visitante[3] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_8_general.replace(',', '.'))
              this.array_porcentajes_handicap_mas05_visitante[4] = parseFloat(this.datosPartido[i].porcentaje_mercado_media.replace(',', '.'))
              this.array_porcentajes_handicap_mas05_visitante[5] = parseFloat(this.datosPartido[i].cuota_favor.replace(',', '.'))
              this.array_porcentajes_handicap_mas05_visitante[6] = parseFloat(this.datosPartido[i].valor.replace(',', '.'))

            }

            if (this.datosPartido[i].mercado == "handicap -0,5 local") {
              this.array_porcentajes_handicap_menos05_local[0] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_sitio.replace(',', '.'))
              this.array_porcentajes_handicap_menos05_local[1] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_general.replace(',', '.'))
              this.array_porcentajes_handicap_menos05_local[2] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_4_sitio.replace(',', '.'))
              this.array_porcentajes_handicap_menos05_local[3] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_8_general.replace(',', '.'))
              this.array_porcentajes_handicap_menos05_local[4] = parseFloat(this.datosPartido[i].porcentaje_mercado_media.replace(',', '.'))
              this.array_porcentajes_handicap_menos05_local[5] = parseFloat(this.datosPartido[i].cuota_favor.replace(',', '.'))
              this.array_porcentajes_handicap_menos05_local[6] = parseFloat(this.datosPartido[i].valor.replace(',', '.'))

            }

            if (this.datosPartido[i].mercado == "handicap -0,5 visitante") {
              this.array_porcentajes_handicap_menos05_visitante[0] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_sitio.replace(',', '.'))
              this.array_porcentajes_handicap_menos05_visitante[1] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_general.replace(',', '.'))
              this.array_porcentajes_handicap_menos05_visitante[2] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_4_sitio.replace(',', '.'))
              this.array_porcentajes_handicap_menos05_visitante[3] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_8_general.replace(',', '.'))
              this.array_porcentajes_handicap_menos05_visitante[4] = parseFloat(this.datosPartido[i].porcentaje_mercado_media.replace(',', '.'))
              this.array_porcentajes_handicap_menos05_visitante[5] = parseFloat(this.datosPartido[i].cuota_favor.replace(',', '.'))
              this.array_porcentajes_handicap_menos05_visitante[6] = parseFloat(this.datosPartido[i].valor.replace(',', '.'))

            }

            if (this.datosPartido[i].mercado == "handicap +1,5 local") {
              this.array_porcentajes_handicap_mas15_local[0] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_sitio.replace(',', '.'))
              this.array_porcentajes_handicap_mas15_local[1] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_general.replace(',', '.'))
              this.array_porcentajes_handicap_mas15_local[2] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_4_sitio.replace(',', '.'))
              this.array_porcentajes_handicap_mas15_local[3] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_8_general.replace(',', '.'))
              this.array_porcentajes_handicap_mas15_local[4] = parseFloat(this.datosPartido[i].porcentaje_mercado_media.replace(',', '.'))
              this.array_porcentajes_handicap_mas15_local[5] = parseFloat(this.datosPartido[i].cuota_favor.replace(',', '.'))
              this.array_porcentajes_handicap_mas15_local[6] = parseFloat(this.datosPartido[i].valor.replace(',', '.'))

            }

            if (this.datosPartido[i].mercado == "handicap +1,5 visitante") {
              this.array_porcentajes_handicap_mas15_visitante[0] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_sitio.replace(',', '.'))
              this.array_porcentajes_handicap_mas15_visitante[1] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_general.replace(',', '.'))
              this.array_porcentajes_handicap_mas15_visitante[2] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_4_sitio.replace(',', '.'))
              this.array_porcentajes_handicap_mas15_visitante[3] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_8_general.replace(',', '.'))
              this.array_porcentajes_handicap_mas15_visitante[4] = parseFloat(this.datosPartido[i].porcentaje_mercado_media.replace(',', '.'))
              this.array_porcentajes_handicap_mas15_visitante[5] = parseFloat(this.datosPartido[i].cuota_favor.replace(',', '.'))
              this.array_porcentajes_handicap_mas15_visitante[6] = parseFloat(this.datosPartido[i].valor.replace(',', '.'))

            }

            if (this.datosPartido[i].mercado == "handicap -1,5 local") {
              this.array_porcentajes_handicap_menos15_local[0] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_sitio.replace(',', '.'))
              this.array_porcentajes_handicap_menos15_local[1] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_general.replace(',', '.'))
              this.array_porcentajes_handicap_menos15_local[2] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_4_sitio.replace(',', '.'))
              this.array_porcentajes_handicap_menos15_local[3] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_8_general.replace(',', '.'))
              this.array_porcentajes_handicap_menos15_local[4] = parseFloat(this.datosPartido[i].porcentaje_mercado_media.replace(',', '.'))
              this.array_porcentajes_handicap_menos15_local[5] = parseFloat(this.datosPartido[i].cuota_favor.replace(',', '.'))
              this.array_porcentajes_handicap_menos15_local[6] = parseFloat(this.datosPartido[i].valor.replace(',', '.'))

            }

            if (this.datosPartido[i].mercado == "handicap -1,5 visitante") {
              this.array_porcentajes_handicap_menos15_visitante[0] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_sitio.replace(',', '.'))
              this.array_porcentajes_handicap_menos15_visitante[1] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_general.replace(',', '.'))
              this.array_porcentajes_handicap_menos15_visitante[2] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_4_sitio.replace(',', '.'))
              this.array_porcentajes_handicap_menos15_visitante[3] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_8_general.replace(',', '.'))
              this.array_porcentajes_handicap_menos15_visitante[4] = parseFloat(this.datosPartido[i].porcentaje_mercado_media.replace(',', '.'))
              this.array_porcentajes_handicap_menos15_visitante[5] = parseFloat(this.datosPartido[i].cuota_favor.replace(',', '.'))
              this.array_porcentajes_handicap_menos15_visitante[6] = parseFloat(this.datosPartido[i].valor.replace(',', '.'))

            }

            if (this.datosPartido[i].mercado == "mas 0,5 local") {
              this.array_porcentajes_mas05_local[0] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_sitio.replace(',', '.'))
              this.array_porcentajes_mas05_local[1] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_general.replace(',', '.'))
              this.array_porcentajes_mas05_local[2] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_4_sitio.replace(',', '.'))
              this.array_porcentajes_mas05_local[3] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_8_general.replace(',', '.'))
              this.array_porcentajes_mas05_local[4] = parseFloat(this.datosPartido[i].porcentaje_mercado_media.replace(',', '.'))
              this.array_porcentajes_mas05_local[5] = parseFloat(this.datosPartido[i].cuota_favor.replace(',', '.'))
              this.array_porcentajes_mas05_local[6] = parseFloat(this.datosPartido[i].valor.replace(',', '.'))


              this.array_proporciones_goles_local[0] = parseFloat(this.datosPartido[i].proporcion_relacionada_en_sitio.replace(',', '.'))
              this.array_proporciones_goles_local[1] = parseFloat(this.datosPartido[i].proporcion_relacionada_en_general.replace(',', '.'))
              this.array_proporciones_goles_local[2] = parseFloat(this.datosPartido[i].proporcion_relacionada_en_ultimos_4_sitio.replace(',', '.'))
              this.array_proporciones_goles_local[3] = parseFloat(this.datosPartido[i].proporcion_relacionada_en_ultimos_8_general.replace(',', '.'))
              this.array_proporciones_goles_local[4] = parseFloat(this.datosPartido[i].proporcion_relacionada_media.replace(',', '.'))


            }

            if (this.datosPartido[i].mercado == "mas 0,5 visitante") {
              this.array_porcentajes_mas05_visitante[0] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_sitio.replace(',', '.'))
              this.array_porcentajes_mas05_visitante[1] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_general.replace(',', '.'))
              this.array_porcentajes_mas05_visitante[2] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_4_sitio.replace(',', '.'))
              this.array_porcentajes_mas05_visitante[3] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_8_general.replace(',', '.'))
              this.array_porcentajes_mas05_visitante[4] = parseFloat(this.datosPartido[i].porcentaje_mercado_media.replace(',', '.'))
              this.array_porcentajes_mas05_visitante[5] = parseFloat(this.datosPartido[i].cuota_favor.replace(',', '.'))
              this.array_porcentajes_mas05_visitante[6] = parseFloat(this.datosPartido[i].valor.replace(',', '.'))


              this.array_proporciones_goles_visitante[0] = parseFloat(this.datosPartido[i].proporcion_relacionada_en_sitio.replace(',', '.'))
              this.array_proporciones_goles_visitante[1] = parseFloat(this.datosPartido[i].proporcion_relacionada_en_general.replace(',', '.'))
              this.array_proporciones_goles_visitante[2] = parseFloat(this.datosPartido[i].proporcion_relacionada_en_ultimos_4_sitio.replace(',', '.'))
              this.array_proporciones_goles_visitante[3] = parseFloat(this.datosPartido[i].proporcion_relacionada_en_ultimos_8_general.replace(',', '.'))
              this.array_proporciones_goles_visitante[4] = parseFloat(this.datosPartido[i].proporcion_relacionada_media.replace(',', '.'))


            }

            if (this.datosPartido[i].mercado == "mas 1,5 local") {
              this.array_porcentajes_mas15_local[0] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_sitio.replace(',', '.'))
              this.array_porcentajes_mas15_local[1] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_general.replace(',', '.'))
              this.array_porcentajes_mas15_local[2] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_4_sitio.replace(',', '.'))
              this.array_porcentajes_mas15_local[3] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_8_general.replace(',', '.'))
              this.array_porcentajes_mas15_local[4] = parseFloat(this.datosPartido[i].porcentaje_mercado_media.replace(',', '.'))
              this.array_porcentajes_mas15_local[5] = parseFloat(this.datosPartido[i].cuota_favor.replace(',', '.'))
              this.array_porcentajes_mas15_local[6] = parseFloat(this.datosPartido[i].valor.replace(',', '.'))

            }

            if (this.datosPartido[i].mercado == "mas 1,5 visitante") {
              this.array_porcentajes_mas15_visitante[0] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_sitio.replace(',', '.'))
              this.array_porcentajes_mas15_visitante[1] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_general.replace(',', '.'))
              this.array_porcentajes_mas15_visitante[2] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_4_sitio.replace(',', '.'))
              this.array_porcentajes_mas15_visitante[3] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_8_general.replace(',', '.'))
              this.array_porcentajes_mas15_visitante[4] = parseFloat(this.datosPartido[i].porcentaje_mercado_media.replace(',', '.'))
              this.array_porcentajes_mas15_visitante[5] = parseFloat(this.datosPartido[i].cuota_favor.replace(',', '.'))
              this.array_porcentajes_mas15_visitante[6] = parseFloat(this.datosPartido[i].valor.replace(',', '.'))

            }

            if (this.datosPartido[i].mercado == "mas 2,5 local") {
              this.array_porcentajes_mas25_local[0] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_sitio.replace(',', '.'))
              this.array_porcentajes_mas25_local[1] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_general.replace(',', '.'))
              this.array_porcentajes_mas25_local[2] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_4_sitio.replace(',', '.'))
              this.array_porcentajes_mas25_local[3] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_8_general.replace(',', '.'))
              this.array_porcentajes_mas25_local[4] = parseFloat(this.datosPartido[i].porcentaje_mercado_media.replace(',', '.'))
              this.array_porcentajes_mas25_local[5] = parseFloat(this.datosPartido[i].cuota_favor.replace(',', '.'))
              this.array_porcentajes_mas25_local[6] = parseFloat(this.datosPartido[i].valor.replace(',', '.'))

            }

            if (this.datosPartido[i].mercado == "mas 2,5 visitante") {
              this.array_porcentajes_mas25_visitante[0] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_sitio.replace(',', '.'))
              this.array_porcentajes_mas25_visitante[1] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_general.replace(',', '.'))
              this.array_porcentajes_mas25_visitante[2] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_4_sitio.replace(',', '.'))
              this.array_porcentajes_mas25_visitante[3] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_8_general.replace(',', '.'))
              this.array_porcentajes_mas25_visitante[4] = parseFloat(this.datosPartido[i].porcentaje_mercado_media.replace(',', '.'))
              this.array_porcentajes_mas25_visitante[5] = parseFloat(this.datosPartido[i].cuota_favor.replace(',', '.'))
              this.array_porcentajes_mas25_visitante[6] = parseFloat(this.datosPartido[i].valor.replace(',', '.'))

            }

            if (this.datosPartido[i].mercado == "menos 0,5 local") {
              this.array_porcentajes_menos05_local[0] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_sitio.replace(',', '.'))
              this.array_porcentajes_menos05_local[1] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_general.replace(',', '.'))
              this.array_porcentajes_menos05_local[2] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_4_sitio.replace(',', '.'))
              this.array_porcentajes_menos05_local[3] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_8_general.replace(',', '.'))
              this.array_porcentajes_menos05_local[4] = parseFloat(this.datosPartido[i].porcentaje_mercado_media.replace(',', '.'))
              this.array_porcentajes_menos05_local[5] = parseFloat(this.datosPartido[i].cuota_favor.replace(',', '.'))
              this.array_porcentajes_menos05_local[6] = parseFloat(this.datosPartido[i].valor.replace(',', '.'))

            }

            if (this.datosPartido[i].mercado == "menos 0,5 visitante") {
              this.array_porcentajes_menos05_visitante[0] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_sitio.replace(',', '.'))
              this.array_porcentajes_menos05_visitante[1] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_general.replace(',', '.'))
              this.array_porcentajes_menos05_visitante[2] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_4_sitio.replace(',', '.'))
              this.array_porcentajes_menos05_visitante[3] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_8_general.replace(',', '.'))
              this.array_porcentajes_menos05_visitante[4] = parseFloat(this.datosPartido[i].porcentaje_mercado_media.replace(',', '.'))
              this.array_porcentajes_menos05_visitante[5] = parseFloat(this.datosPartido[i].cuota_favor.replace(',', '.'))
              this.array_porcentajes_menos05_visitante[6] = parseFloat(this.datosPartido[i].valor.replace(',', '.'))

            }

            if (this.datosPartido[i].mercado == "menos 1,5 local") {
              this.array_porcentajes_menos15_local[0] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_sitio.replace(',', '.'))
              this.array_porcentajes_menos15_local[1] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_general.replace(',', '.'))
              this.array_porcentajes_menos15_local[2] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_4_sitio.replace(',', '.'))
              this.array_porcentajes_menos15_local[3] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_8_general.replace(',', '.'))
              this.array_porcentajes_menos15_local[4] = parseFloat(this.datosPartido[i].porcentaje_mercado_media.replace(',', '.'))
              this.array_porcentajes_menos15_local[5] = parseFloat(this.datosPartido[i].cuota_favor.replace(',', '.'))
              this.array_porcentajes_menos15_local[6] = parseFloat(this.datosPartido[i].valor.replace(',', '.'))

            }

            if (this.datosPartido[i].mercado == "menos 1,5 visitante") {
              this.array_porcentajes_menos15_visitante[0] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_sitio.replace(',', '.'))
              this.array_porcentajes_menos15_visitante[1] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_general.replace(',', '.'))
              this.array_porcentajes_menos15_visitante[2] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_4_sitio.replace(',', '.'))
              this.array_porcentajes_menos15_visitante[3] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_8_general.replace(',', '.'))
              this.array_porcentajes_menos15_visitante[4] = parseFloat(this.datosPartido[i].porcentaje_mercado_media.replace(',', '.'))
              this.array_porcentajes_menos15_visitante[5] = parseFloat(this.datosPartido[i].cuota_favor.replace(',', '.'))
              this.array_porcentajes_menos15_visitante[6] = parseFloat(this.datosPartido[i].valor.replace(',', '.'))

            }

            if (this.datosPartido[i].mercado == "menos 2,5 local") {
              this.array_porcentajes_menos25_local[0] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_sitio.replace(',', '.'))
              this.array_porcentajes_menos25_local[1] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_general.replace(',', '.'))
              this.array_porcentajes_menos25_local[2] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_4_sitio.replace(',', '.'))
              this.array_porcentajes_menos25_local[3] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_8_general.replace(',', '.'))
              this.array_porcentajes_menos25_local[4] = parseFloat(this.datosPartido[i].porcentaje_mercado_media.replace(',', '.'))
              this.array_porcentajes_menos25_local[5] = parseFloat(this.datosPartido[i].cuota_favor.replace(',', '.'))
              this.array_porcentajes_menos25_local[6] = parseFloat(this.datosPartido[i].valor.replace(',', '.'))

            }

            if (this.datosPartido[i].mercado == "menos 2,5 visitante") {
              this.array_porcentajes_menos25_visitante[0] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_sitio.replace(',', '.'))
              this.array_porcentajes_menos25_visitante[1] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_general.replace(',', '.'))
              this.array_porcentajes_menos25_visitante[2] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_4_sitio.replace(',', '.'))
              this.array_porcentajes_menos25_visitante[3] = parseFloat(this.datosPartido[i].porcentaje_mercado_en_ultimos_8_general.replace(',', '.'))
              this.array_porcentajes_menos25_visitante[4] = parseFloat(this.datosPartido[i].porcentaje_mercado_media.replace(',', '.'))
              this.array_porcentajes_menos25_visitante[5] = parseFloat(this.datosPartido[i].cuota_favor.replace(',', '.'))
              this.array_porcentajes_menos25_visitante[6] = parseFloat(this.datosPartido[i].valor.replace(',', '.'))

            }



          }






          this.crearGraficoHandicap()
          this.crearGraficoGoles()
          this.crearGraficoGolesLocal()
          this.crearGraficoGolesVisitante()
          this.crearGraficoProporcionesPuntos()
          this.crearGraficoProporcionesGoles()
          this.crearGraficoProporcionesGolesLocal()
          this.crearGraficoProporcionesGolesVisitante()

        },
        error: (e) => console.error(e)
      });
  }










  crearGraficoProporcionesGolesLocal() {
    this.chartGraficoProporcionesGoles = new Chart('graficoProporcionesGolesLocal', {
      type: 'bar',
      data: {
        labels: ["Sitio","Total","Ultimos 4 sitio","Ultimos 8 total","Media"],
        datasets: [{
          label: 'Goles local',
          data: this.array_proporciones_goles_local,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
              beginAtZero: true, 
              max: 2.5, 
              ticks:{
                stepSize:0.3
              }
          }
      }
      }
    });

  }




  crearGraficoProporcionesGolesVisitante() {
    this.chartGraficoProporcionesGoles = new Chart('graficoProporcionesGolesVisitante', {
      type: 'bar',
      data: {
        labels: ["Sitio","Total","Ultimos 4 sitio","Ultimos 8 total","Media"],
        datasets: [{
          label: 'Goles visitante',
          data: this.array_proporciones_goles_visitante,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
              beginAtZero: true, 
              max: 2.5, 
              ticks:{
                stepSize:0.3
              }
          }
      }
      }
    });

  }









  //graficos
  crearGraficoProporcionesGoles() {
    this.chartGraficoProporcionesGoles = new Chart('graficoProporcionesGoles', {
      type: 'bar',
      data: {
        labels: ["Sitio","Total","Ultimos 4 sitio","Ultimos 8 total","Media"],
        datasets: [{
          label: 'Goles',
          data: this.array_proporciones_goles,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
       
      }
    });

  }


  crearGraficoProporcionesPuntos() {
    this.chartGraficoProporcionesPuntos = new Chart('graficoProporcionesPuntos', {
      type: 'bar',
      data: {
        labels: ["Sitio","Total","Ultimos 4 sitio","Ultimos 8 total","Media"],
        datasets: [{
          label: 'Puntos',
          data: this.array_proporciones_puntos,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
       
      }
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
        labels: ['+1,5 local', '+0,5 local', 'Empate', '+0,5 visitante', '+1,5 visitante'],
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
        labels: ['1,5 goles', '2,5 goles', '3,5 goles', '4,5 goles', 'Ambos marcan'],
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
        labels: ['0,5 goles', '1,5 goles', '2,5 goles'],
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
        labels: ['0,5 goles', '1,5 goles', '2,5 goles'],
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






































  //marcar opcion en selector
  procesarMercado() {
    this.seleccionMercado = true;
    for (var k = 0; k < this.partidos_local_del_local.length; k++) {
      var partido = this.partidos_local_del_local[k]
      console.log(partido)
      var goles = parseInt(partido.resultado_local) + parseInt(partido.resultado_visitante)
      var diferencia=parseInt(partido.resultado_local) - parseInt(partido.resultado_visitante)
      var goles_local=parseInt(partido.resultado_local)
      var goles_visitante=parseInt(partido.resultado_visitante)

      if (this.mercadoSeleccionado == "Mas 1,5 goles") {
        if (goles > 1) {
          this.partidos_local_del_local[k].color = 1

        } else {
          this.partidos_local_del_local[k].color = 0

        }
      }

      if (this.mercadoSeleccionado == "Menos 1,5 goles") {
        if (goles <2) {
          this.partidos_local_del_local[k].color = 1

        } else {
          this.partidos_local_del_local[k].color = 0

        }
      }

      if (this.mercadoSeleccionado == "Mas 2,5 goles") {
        if (goles > 2) {
          this.partidos_local_del_local[k].color = 1

        } else {
          this.partidos_local_del_local[k].color = 0

        }
      }

      if (this.mercadoSeleccionado == "Menos 2,5 goles") {
        if (goles <3) {
          this.partidos_local_del_local[k].color = 1

        } else {
          this.partidos_local_del_local[k].color = 0

        }
      }




      if (this.mercadoSeleccionado == "Menos 3,5 goles") {
        if (goles < 4) {
          this.partidos_local_del_local[k].color = 1

        } else {
          this.partidos_local_del_local[k].color = 0

        }
      }

      if (this.mercadoSeleccionado == "Mas 3,5 goles") {
        if (goles >3) {
          this.partidos_local_del_local[k].color = 1

        } else {
          this.partidos_local_del_local[k].color = 0

        }
      }




      if (this.mercadoSeleccionado == "Menos 4,5 goles") {
        if (goles < 5) {
          this.partidos_local_del_local[k].color = 1

        } else {
          this.partidos_local_del_local[k].color = 0

        }
      }

      
      if (this.mercadoSeleccionado == "Mas 4,5 goles") {
        if (goles >4) {
          this.partidos_local_del_local[k].color = 1

        } else {
          this.partidos_local_del_local[k].color = 0

        }
      }

      if (this.mercadoSeleccionado == "Handicap +1,5 local") {
        if (diferencia>=-1) {
          this.partidos_local_del_local[k].color = 1

        } else {
          this.partidos_local_del_local[k].color = 0

        }
      }

      if (this.mercadoSeleccionado == "Handicap -1,5 local") {
        if (diferencia>1) {
          this.partidos_local_del_local[k].color = 1

        } else {
          this.partidos_local_del_local[k].color = 0

        }
      }

      if (this.mercadoSeleccionado == "Handicap +1,5 visitante") {
        if (diferencia<=1) {
          this.partidos_local_del_local[k].color = 1

        } else {
          this.partidos_local_del_local[k].color = 0

        }
      }

      if (this.mercadoSeleccionado == "Handicap -1,5 visitante") {
        if (diferencia<-1) {
          this.partidos_local_del_local[k].color = 1

        } else {
          this.partidos_local_del_local[k].color = 0

        }
      }

      if (this.mercadoSeleccionado == "Handicap +0,5 local") {
        if (diferencia>=0) {
          this.partidos_local_del_local[k].color = 1

        } else {
          this.partidos_local_del_local[k].color = 0

        }
      }

      if (this.mercadoSeleccionado == "Handicap -0,5 local") {
        if (diferencia>0) {
          this.partidos_local_del_local[k].color = 1

        } else {
          this.partidos_local_del_local[k].color = 0

        }
      }

      if (this.mercadoSeleccionado == "Handicap +0,5 visitante") {
        if (diferencia<=0) {
          this.partidos_local_del_local[k].color = 1

        } else {
          this.partidos_local_del_local[k].color = 0

        }
      }

      if (this.mercadoSeleccionado == "Handicap -0,5 visitante") {
        if (diferencia<0) {
          this.partidos_local_del_local[k].color = 1

        } else {
          this.partidos_local_del_local[k].color = 0

        }
      }

      if (this.mercadoSeleccionado == "No empate") {
        if (diferencia!=0) {
          this.partidos_local_del_local[k].color = 1

        } else {
          this.partidos_local_del_local[k].color = 0

        }
      }

      if (this.mercadoSeleccionado == "Ambos marcan") {
        if (goles_local>0 && goles_visitante>0) {
          this.partidos_local_del_local[k].color = 1

        } else {
          this.partidos_local_del_local[k].color = 0

        }
      }

      if (this.mercadoSeleccionado == "Mas 0,5 local") {
        if (goles_local>0) {
          this.partidos_local_del_local[k].color = 1

        } else {
          this.partidos_local_del_local[k].color = 0

        }
      }

      if (this.mercadoSeleccionado == "Menos 0,5 local") {
        if (goles_local==0) {
          this.partidos_local_del_local[k].color = 1

        } else {
          this.partidos_local_del_local[k].color = 0

        }
      }
      if (this.mercadoSeleccionado == "Mas 0,5 visitante") {
        if (goles_visitante>0) {
          this.partidos_local_del_local[k].color = 1

        } else {
          this.partidos_local_del_local[k].color = 0

        }
      }

      if (this.mercadoSeleccionado == "Menos 0,5 visitante") {
        if (goles_visitante==0) {
          this.partidos_local_del_local[k].color = 1

        } else {
          this.partidos_local_del_local[k].color = 0

        }
      }

      if (this.mercadoSeleccionado == "Menos 1,5 local") {
        if (goles_local<2) {
          this.partidos_local_del_local[k].color = 1

        } else {
          this.partidos_local_del_local[k].color = 0

        }
      }

      if (this.mercadoSeleccionado == "Mas 1,5 local") {
        if (goles_local>1) {
          this.partidos_local_del_local[k].color = 1

        } else {
          this.partidos_local_del_local[k].color = 0

        }
      }
      if (this.mercadoSeleccionado == "Menos 1,5 visitante") {
        if (goles_visitante<2) {
          this.partidos_local_del_local[k].color = 1

        } else {
          this.partidos_local_del_local[k].color = 0

        }
      }

      if (this.mercadoSeleccionado == "Mas 1,5 visitante") {
        if (goles_visitante>1) {
          this.partidos_local_del_local[k].color = 1

        } else {
          this.partidos_local_del_local[k].color = 0

        }
      }

      if (this.mercadoSeleccionado == "Menos 2,5 local") {
        if (goles_local<3) {
          this.partidos_local_del_local[k].color = 1

        } else {
          this.partidos_local_del_local[k].color = 0

        }
      }

      if (this.mercadoSeleccionado == "Mas 2,5 local") {
        if (goles_local>2) {
          this.partidos_local_del_local[k].color = 1

        } else {
          this.partidos_local_del_local[k].color = 0

        }
      }
      if (this.mercadoSeleccionado == "Menos 2,5 visitante") {
        if (goles_visitante<3) {
          this.partidos_local_del_local[k].color = 1

        } else {
          this.partidos_local_del_local[k].color = 0

        }
      }

      if (this.mercadoSeleccionado == "Mas 2,5 visitante") {
        if (goles_visitante>2) {
          this.partidos_local_del_local[k].color = 1

        } else {
          this.partidos_local_del_local[k].color = 0

        }
      }
    }



















    for (var k = 0; k < this.partidos_visitante_del_visitante.length; k++) {
      var partido = this.partidos_visitante_del_visitante[k]
      console.log(partido)
      var goles = parseInt(partido.resultado_local) + parseInt(partido.resultado_visitante)
      var diferencia=parseInt(partido.resultado_local) - parseInt(partido.resultado_visitante)
      var goles_local=parseInt(partido.resultado_local)
      var goles_visitante=parseInt(partido.resultado_visitante)

      if (this.mercadoSeleccionado == "Mas 1,5 goles") {
        if (goles > 1) {
          this.partidos_visitante_del_visitante[k].color = 1

        } else {
          this.partidos_visitante_del_visitante[k].color = 0

        }
      }

      if (this.mercadoSeleccionado == "Mas 2,5 goles") {
        if (goles > 2) {
          this.partidos_visitante_del_visitante[k].color = 1

        } else {
          this.partidos_visitante_del_visitante[k].color = 0

        }
      }




      if (this.mercadoSeleccionado == "Menos 3,5 goles") {
        if (goles < 4) {
          this.partidos_visitante_del_visitante[k].color = 1

        } else {
          this.partidos_visitante_del_visitante[k].color = 0

        }
      }




      if (this.mercadoSeleccionado == "Menos 4,5 goles") {
        if (goles < 5) {
          this.partidos_visitante_del_visitante[k].color = 1

        } else {
          this.partidos_visitante_del_visitante[k].color = 0

        }
      }


      if (this.mercadoSeleccionado == "Handicap +1,5 local") {
        if (diferencia>=-1) {
          this.partidos_visitante_del_visitante[k].color = 1

        } else {
          this.partidos_visitante_del_visitante[k].color = 0

        }
      }

      if (this.mercadoSeleccionado == "Handicap +1,5 visitante") {
        if (diferencia<=1) {
          this.partidos_visitante_del_visitante[k].color = 1

        } else {
          this.partidos_visitante_del_visitante[k].color = 0

        }
      }

      if (this.mercadoSeleccionado == "Handicap +0,5 local") {
        if (diferencia>=0) {
          this.partidos_visitante_del_visitante[k].color = 1

        } else {
          this.partidos_visitante_del_visitante[k].color = 0

        }
      }

      if (this.mercadoSeleccionado == "Handicap +0,5 visitante") {
        if (diferencia<=0) {
          this.partidos_visitante_del_visitante[k].color = 1

        } else {
          this.partidos_visitante_del_visitante[k].color = 0

        }
      }

      if (this.mercadoSeleccionado == "No empate") {
        if (diferencia!=0) {
          this.partidos_visitante_del_visitante[k].color = 1

        } else {
          this.partidos_visitante_del_visitante[k].color = 0

        }
      }

      if (this.mercadoSeleccionado == "Mas 0,5 local") {
        if (goles_local>0) {
          this.partidos_visitante_del_visitante[k].color = 1

        } else {
          this.partidos_visitante_del_visitante[k].color = 0

        }
      }
      if (this.mercadoSeleccionado == "Mas 0,5 visitante") {
        if (goles_visitante>0) {
          this.partidos_visitante_del_visitante[k].color = 1

        } else {
          this.partidos_visitante_del_visitante[k].color = 0

        }
      }

      if (this.mercadoSeleccionado == "Menos 1,5 local") {
        if (goles_local<2) {
          this.partidos_visitante_del_visitante[k].color = 1

        } else {
          this.partidos_visitante_del_visitante[k].color = 0

        }
      }
      if (this.mercadoSeleccionado == "Menos 1,5 visitante") {
        if (goles_visitante<2) {
          this.partidos_visitante_del_visitante[k].color = 1

        } else {
          this.partidos_visitante_del_visitante[k].color = 0

        }
      }

      if (this.mercadoSeleccionado == "Menos 2,5 local") {
        if (goles_local<3) {
          this.partidos_visitante_del_visitante[k].color = 1

        } else {
          this.partidos_visitante_del_visitante[k].color = 0

        }
      }
      if (this.mercadoSeleccionado == "Menos 2,5 visitante") {
        if (goles_visitante<3) {
          this.partidos_visitante_del_visitante[k].color = 1

        } else {
          this.partidos_visitante_del_visitante[k].color = 0

        }
      }
    }

















    for (var k = 0; k < this.partidos_total_del_local.length; k++) {
      var partido = this.partidos_total_del_local[k]
      console.log(partido)
      var goles = parseInt(partido.resultado_local) + parseInt(partido.resultado_visitante)
      var diferencia=parseInt(partido.resultado_local) - parseInt(partido.resultado_visitante)
      var goles_local=parseInt(partido.resultado_local)
      var goles_visitante=parseInt(partido.resultado_visitante)
      var nombre_local_partido=partido.nombre_local
      var nombre_visitante_partido=partido.nombre_visitante

      if (this.mercadoSeleccionado == "Mas 1,5 goles") {
        if (goles > 1) {
          this.partidos_total_del_local[k].color = 1

        } else {
          this.partidos_total_del_local[k].color = 0

        }
      }

      if (this.mercadoSeleccionado == "Mas 2,5 goles") {
        if (goles > 2) {
          this.partidos_total_del_local[k].color = 1

        } else {
          this.partidos_total_del_local[k].color = 0

        }
      }




      if (this.mercadoSeleccionado == "Menos 3,5 goles") {
        if (goles < 4) {
          this.partidos_total_del_local[k].color = 1

        } else {
          this.partidos_total_del_local[k].color = 0

        }
      }




      if (this.mercadoSeleccionado == "Menos 4,5 goles") {
        if (goles < 5) {
          this.partidos_total_del_local[k].color = 1

        } else {
          this.partidos_total_del_local[k].color = 0

        }
      }


      if (this.mercadoSeleccionado == "Handicap +1,5 local") {
        if(nombre_local_partido==this.nombreLocal){
          if (diferencia>=-1) {
            this.partidos_total_del_local[k].color = 1
  
          } else {
            this.partidos_total_del_local[k].color = 0
  
          }
        }else{
          if (diferencia<=1) {
            this.partidos_total_del_local[k].color = 1
  
          } else {
            this.partidos_total_del_local[k].color = 0
  
          }
        }

      }

      if (this.mercadoSeleccionado == "Handicap +1,5 visitante") {
        if(nombre_local_partido==this.nombreLocal){
          if (diferencia<=1) {
            this.partidos_total_del_local[k].color = 1
  
          } else {
            this.partidos_total_del_local[k].color = 0
  
          }
        }else{
          if (diferencia>=-1) {
            this.partidos_total_del_local[k].color = 1
  
          } else {
            this.partidos_total_del_local[k].color = 0
  
          }
        }
      }

      if (this.mercadoSeleccionado == "Handicap +0,5 local") {
        if(nombre_local_partido==this.nombreLocal){
          if (diferencia>=0) {
            this.partidos_total_del_local[k].color = 1
  
          } else {
            this.partidos_total_del_local[k].color = 0
  
          }
        }else{
          if (diferencia<=0) {
            this.partidos_total_del_local[k].color = 1
  
          } else {
            this.partidos_total_del_local[k].color = 0
  
          }
        }
      }

      if (this.mercadoSeleccionado == "Handicap +0,5 visitante") {
        if(nombre_local_partido==this.nombreLocal){
          if (diferencia<=0) {
            this.partidos_total_del_local[k].color = 1
  
          } else {
            this.partidos_total_del_local[k].color = 0
  
          }
        }else{
          if (diferencia>=0) {
            this.partidos_total_del_local[k].color = 1
  
          } else {
            this.partidos_total_del_local[k].color = 0
  
          }
        }
      }

      if (this.mercadoSeleccionado == "No empate") {
        if (diferencia!=0) {
          this.partidos_total_del_local[k].color = 1

        } else {
          this.partidos_total_del_local[k].color = 0

        }
      }

      if (this.mercadoSeleccionado == "Mas 0,5 local") {
        if(nombre_local_partido==this.nombreLocal){
          if (goles_local>0) {
            this.partidos_total_del_local[k].color = 1
  
          } else {
            this.partidos_total_del_local[k].color = 0
  
          }
        }else{
          if (goles_visitante>0) {
            this.partidos_total_del_local[k].color = 1
  
          } else {
            this.partidos_total_del_local[k].color = 0
  
          }
        }
      }
      if (this.mercadoSeleccionado == "Mas 0,5 visitante") {
        if(nombre_local_partido==this.nombreLocal){
          if (goles_visitante>0) {
            this.partidos_total_del_local[k].color = 1
  
          } else {
            this.partidos_total_del_local[k].color = 0
  
          }
        }else{
          if (goles_local>0) {
            this.partidos_total_del_local[k].color = 1
  
          } else {
            this.partidos_total_del_local[k].color = 0
  
          }
        }
      }

      if (this.mercadoSeleccionado == "Menos 1,5 local") {
        if(nombre_local_partido==this.nombreLocal){
          if (goles_local<2) {
            this.partidos_total_del_local[k].color = 1
  
          } else {
            this.partidos_total_del_local[k].color = 0
  
          }
        }else{
          if (goles_visitante<2) {
            this.partidos_total_del_local[k].color = 1
  
          } else {
            this.partidos_total_del_local[k].color = 0
  
          }
        }
      }
      if (this.mercadoSeleccionado == "Menos 1,5 visitante") {
        if(nombre_local_partido==this.nombreLocal){
          if (goles_visitante<2) {
            this.partidos_total_del_local[k].color = 1
  
          } else {
            this.partidos_total_del_local[k].color = 0
  
          }
        }else{
          if (goles_local<2) {
            this.partidos_total_del_local[k].color = 1
  
          } else {
            this.partidos_total_del_local[k].color = 0
  
          }
        }
      }

      if (this.mercadoSeleccionado == "Menos 2,5 local") {
        if(nombre_local_partido==this.nombreLocal){
          if (goles_local<3) {
            this.partidos_total_del_local[k].color = 1
  
          } else {
            this.partidos_total_del_local[k].color = 0
  
          }
        }else{
          if (goles_visitante<3) {
            this.partidos_total_del_local[k].color = 1
  
          } else {
            this.partidos_total_del_local[k].color = 0
  
          }
        }
      }
      if (this.mercadoSeleccionado == "Menos 2,5 visitante") {
        if(nombre_local_partido==this.nombreLocal){
          if (goles_visitante<3) {
            this.partidos_total_del_local[k].color = 1
  
          } else {
            this.partidos_total_del_local[k].color = 0
  
          }
        }else{
          if (goles_local<3) {
            this.partidos_total_del_local[k].color = 1
  
          } else {
            this.partidos_total_del_local[k].color = 0
  
          }
        }
      }
    }















    for (var k = 0; k < this.partidos_total_del_visitante.length; k++) {
      var partido = this.partidos_total_del_visitante[k]
      console.log(partido)
      var goles = parseInt(partido.resultado_local) + parseInt(partido.resultado_visitante)
      var diferencia=parseInt(partido.resultado_local) - parseInt(partido.resultado_visitante)
      var goles_local=parseInt(partido.resultado_local)
      var goles_visitante=parseInt(partido.resultado_visitante)
      var nombre_local_partido=partido.nombre_local
      var nombre_visitante_partido=partido.nombre_visitante

      if (this.mercadoSeleccionado == "Mas 1,5 goles") {
        if (goles > 1) {
          this.partidos_total_del_visitante[k].color = 1

        } else {
          this.partidos_total_del_visitante[k].color = 0

        }
      }

      if (this.mercadoSeleccionado == "Mas 2,5 goles") {
        if (goles > 2) {
          this.partidos_total_del_visitante[k].color = 1

        } else {
          this.partidos_total_del_visitante[k].color = 0

        }
      }




      if (this.mercadoSeleccionado == "Menos 3,5 goles") {
        if (goles < 4) {
          this.partidos_total_del_visitante[k].color = 1

        } else {
          this.partidos_total_del_visitante[k].color = 0

        }
      }




      if (this.mercadoSeleccionado == "Menos 4,5 goles") {
        if (goles < 5) {
          this.partidos_total_del_visitante[k].color = 1

        } else {
          this.partidos_total_del_visitante[k].color = 0

        }
      }

      if (this.mercadoSeleccionado == "Handicap +1,5 local") {
       if(nombre_visitante_partido==this.nombreVisitante){
          if (diferencia>=-1) {
            this.partidos_total_del_visitante[k].color = 1
  
          } else {
            this.partidos_total_del_visitante[k].color = 0
  
          }
        }else{
          if (diferencia<=1) {
            this.partidos_total_del_visitante[k].color = 1
  
          } else {
            this.partidos_total_del_visitante[k].color = 0
  
          }
        }
      }

      if (this.mercadoSeleccionado == "Handicap +1,5 visitante") {
        if(nombre_visitante_partido==this.nombreVisitante){
          if (diferencia<=1) {
            this.partidos_total_del_visitante[k].color = 1
  
          } else {
            this.partidos_total_del_visitante[k].color = 0
  
          }
        }else{
          if (diferencia>=-1) {
            this.partidos_total_del_visitante[k].color = 1
  
          } else {
            this.partidos_total_del_visitante[k].color = 0
  
          }
        }
      }

      if (this.mercadoSeleccionado == "Handicap +0,5 local") {
        if(nombre_visitante_partido==this.nombreVisitante){
          if (diferencia>=0) {
            this.partidos_total_del_visitante[k].color = 1
  
          } else {
            this.partidos_total_del_visitante[k].color = 0
  
          }
        }else{
          if (diferencia<=0) {
            this.partidos_total_del_visitante[k].color = 1
  
          } else {
            this.partidos_total_del_visitante[k].color = 0
  
          }
        }
      }

      if (this.mercadoSeleccionado == "Handicap +0,5 visitante") {
        if(nombre_visitante_partido==this.nombreVisitante){
          if (diferencia<=0) {
            this.partidos_total_del_visitante[k].color = 1
  
          } else {
            this.partidos_total_del_visitante[k].color = 0
  
          }
        }else{
          if (diferencia>=0) {
            this.partidos_total_del_visitante[k].color = 1
  
          } else {
            this.partidos_total_del_visitante[k].color = 0
  
          }
        }
      }

      if (this.mercadoSeleccionado == "No empate") {
        if (diferencia!=0) {
          this.partidos_total_del_visitante[k].color = 1

        } else {
          this.partidos_total_del_visitante[k].color = 0

        }
      }

      if (this.mercadoSeleccionado == "Mas 0,5 local") {
        if(nombre_visitante_partido==this.nombreVisitante){
          if (goles_local>0) {
            this.partidos_total_del_visitante[k].color = 1
  
          } else {
            this.partidos_total_del_visitante[k].color = 0
  
          }
        }else{
          if (goles_visitante>0) {
            this.partidos_total_del_visitante[k].color = 1
  
          } else {
            this.partidos_total_del_visitante[k].color = 0
  
          }
        }
      }
      if (this.mercadoSeleccionado == "Mas 0,5 visitante") {
        if(nombre_visitante_partido==this.nombreVisitante){
          if (goles_visitante>0) {
            this.partidos_total_del_visitante[k].color = 1
  
          } else {
            this.partidos_total_del_visitante[k].color = 0
  
          }
        }else{
          if (goles_local>0) {
            this.partidos_total_del_visitante[k].color = 1
  
          } else {
            this.partidos_total_del_visitante[k].color = 0
  
          }
        }
      }

      if (this.mercadoSeleccionado == "Menos 1,5 local") {
        if(nombre_visitante_partido==this.nombreVisitante){
          if (goles_local<2) {
            this.partidos_total_del_visitante[k].color = 1
  
          } else {
            this.partidos_total_del_visitante[k].color = 0
  
          }
        }else{
          if (goles_visitante<2) {
            this.partidos_total_del_visitante[k].color = 1
  
          } else {
            this.partidos_total_del_visitante[k].color = 0
  
          }
        }
      }
      if (this.mercadoSeleccionado == "Menos 1,5 visitante") {
        if(nombre_visitante_partido==this.nombreVisitante){
          if (goles_visitante<2) {
            this.partidos_total_del_visitante[k].color = 1
  
          } else {
            this.partidos_total_del_visitante[k].color = 0
  
          }
        }else{
          if (goles_local<2) {
            this.partidos_total_del_visitante[k].color = 1
  
          } else {
            this.partidos_total_del_visitante[k].color = 0
  
          }
        }
      }

      if (this.mercadoSeleccionado == "Menos 2,5 local") {
        if(nombre_visitante_partido==this.nombreVisitante){
          if (goles_local<3) {
            this.partidos_total_del_visitante[k].color = 1
  
          } else {
            this.partidos_total_del_visitante[k].color = 0
  
          }
        }else{
          if (goles_visitante<3) {
            this.partidos_total_del_visitante[k].color = 1
  
          } else {
            this.partidos_total_del_visitante[k].color = 0
  
          }
        }
      }
      if (this.mercadoSeleccionado == "Menos 2,5 visitante") {
        if(nombre_visitante_partido==this.nombreVisitante){
          if (goles_visitante<3) {
            this.partidos_total_del_visitante[k].color = 1
  
          } else {
            this.partidos_total_del_visitante[k].color = 0
  
          }
        }else{
          if (goles_local<3) {
            this.partidos_total_del_visitante[k].color = 1
  
          } else {
            this.partidos_total_del_visitante[k].color = 0
  
          }
        }
      }
    }













    for (var k = 0; k < this.partidos_ultimos_4_local.length; k++) {
      var partido = this.partidos_ultimos_4_local[k]
      console.log(partido)
      var goles = parseInt(partido.resultado_local) + parseInt(partido.resultado_visitante)
      var diferencia=parseInt(partido.resultado_local) - parseInt(partido.resultado_visitante)
      var goles_local=parseInt(partido.resultado_local)
      var goles_visitante=parseInt(partido.resultado_visitante)

      if (this.mercadoSeleccionado == "Mas 1,5 goles") {
        if (goles > 1) {
          this.partidos_ultimos_4_local[k].color = 1

        } else {
          this.partidos_ultimos_4_local[k].color = 0

        }
      }

      if (this.mercadoSeleccionado == "Mas 2,5 goles") {
        if (goles > 2) {
          this.partidos_ultimos_4_local[k].color = 1

        } else {
          this.partidos_ultimos_4_local[k].color = 0

        }
      }




      if (this.mercadoSeleccionado == "Menos 3,5 goles") {
        if (goles < 4) {
          this.partidos_ultimos_4_local[k].color = 1

        } else {
          this.partidos_ultimos_4_local[k].color = 0

        }
      }




      if (this.mercadoSeleccionado == "Menos 4,5 goles") {
        if (goles < 5) {
          this.partidos_ultimos_4_local[k].color = 1

        } else {
          this.partidos_ultimos_4_local[k].color = 0

        }
      }

      if (this.mercadoSeleccionado == "Handicap +1,5 local") {
        if (diferencia>=-1) {
          this.partidos_ultimos_4_local[k].color = 1

        } else {
          this.partidos_ultimos_4_local[k].color = 0

        }
      }

      if (this.mercadoSeleccionado == "Handicap +1,5 visitante") {
        if (diferencia<=1) {
          this.partidos_ultimos_4_local[k].color = 1

        } else {
          this.partidos_ultimos_4_local[k].color = 0

        }
      }

      if (this.mercadoSeleccionado == "Handicap +0,5 local") {
        if (diferencia>=0) {
          this.partidos_ultimos_4_local[k].color = 1

        } else {
          this.partidos_ultimos_4_local[k].color = 0

        }
      }

      if (this.mercadoSeleccionado == "Handicap +0,5 visitante") {
        if (diferencia<=0) {
          this.partidos_ultimos_4_local[k].color = 1

        } else {
          this.partidos_ultimos_4_local[k].color = 0

        }
      }

      if (this.mercadoSeleccionado == "No empate") {
        if (diferencia!=0) {
          this.partidos_ultimos_4_local[k].color = 1

        } else {
          this.partidos_ultimos_4_local[k].color = 0

        }
      }

      if (this.mercadoSeleccionado == "Mas 0,5 local") {
        if (goles_local>0) {
          this.partidos_ultimos_4_local[k].color = 1

        } else {
          this.partidos_ultimos_4_local[k].color = 0

        }
      }
      if (this.mercadoSeleccionado == "Mas 0,5 visitante") {
        if (goles_visitante>0) {
          this.partidos_ultimos_4_local[k].color = 1

        } else {
          this.partidos_ultimos_4_local[k].color = 0

        }
      }

      if (this.mercadoSeleccionado == "Menos 1,5 local") {
        if (goles_local<2) {
          this.partidos_ultimos_4_local[k].color = 1

        } else {
          this.partidos_ultimos_4_local[k].color = 0

        }
      }
      if (this.mercadoSeleccionado == "Menos 1,5 visitante") {
        if (goles_visitante<2) {
          this.partidos_ultimos_4_local[k].color = 1

        } else {
          this.partidos_ultimos_4_local[k].color = 0

        }
      }

      if (this.mercadoSeleccionado == "Menos 2,5 local") {
        if (goles_local<3) {
          this.partidos_ultimos_4_local[k].color = 1

        } else {
          this.partidos_ultimos_4_local[k].color = 0

        }
      }
      if (this.mercadoSeleccionado == "Menos 2,5 visitante") {
        if (goles_visitante<3) {
          this.partidos_ultimos_4_local[k].color = 1

        } else {
          this.partidos_ultimos_4_local[k].color = 0

        }
      }
    }




    for (var k = 0; k < this.partidos_ultimos_4_visitante.length; k++) {
      var partido = this.partidos_ultimos_4_visitante[k]
      console.log(partido)
      var goles = parseInt(partido.resultado_local) + parseInt(partido.resultado_visitante)
      var diferencia=parseInt(partido.resultado_local) - parseInt(partido.resultado_visitante)
      var goles_local=parseInt(partido.resultado_local)
      var goles_visitante=parseInt(partido.resultado_visitante)

      if (this.mercadoSeleccionado == "Mas 1,5 goles") {
        if (goles > 1) {
          this.partidos_ultimos_4_visitante[k].color = 1

        } else {
          this.partidos_ultimos_4_visitante[k].color = 0

        }
      }

      if (this.mercadoSeleccionado == "Mas 2,5 goles") {
        if (goles > 2) {
          this.partidos_ultimos_4_visitante[k].color = 1

        } else {
          this.partidos_ultimos_4_visitante[k].color = 0

        }
      }




      if (this.mercadoSeleccionado == "Menos 3,5 goles") {
        if (goles < 4) {
          this.partidos_ultimos_4_visitante[k].color = 1

        } else {
          this.partidos_ultimos_4_visitante[k].color = 0

        }
      }




      if (this.mercadoSeleccionado == "Menos 4,5 goles") {
        if (goles < 5) {
          this.partidos_ultimos_4_visitante[k].color = 1

        } else {
          this.partidos_ultimos_4_visitante[k].color = 0

        }
      }

      if (this.mercadoSeleccionado == "Handicap +1,5 local") {
        if (diferencia>=-1) {
          this.partidos_ultimos_4_visitante[k].color = 1

        } else {
          this.partidos_ultimos_4_visitante[k].color = 0

        }
      }

      if (this.mercadoSeleccionado == "Handicap +1,5 visitante") {
        if (diferencia<=1) {
          this.partidos_ultimos_4_visitante[k].color = 1

        } else {
          this.partidos_ultimos_4_visitante[k].color = 0

        }
      }

      if (this.mercadoSeleccionado == "Handicap +0,5 local") {
        if (diferencia>=0) {
          this.partidos_ultimos_4_visitante[k].color = 1

        } else {
          this.partidos_ultimos_4_visitante[k].color = 0

        }
      }

      if (this.mercadoSeleccionado == "Handicap +0,5 visitante") {
        if (diferencia<=0) {
          this.partidos_ultimos_4_visitante[k].color = 1

        } else {
          this.partidos_ultimos_4_visitante[k].color = 0

        }
      }

      if (this.mercadoSeleccionado == "No empate") {
        if (diferencia!=0) {
          this.partidos_ultimos_4_visitante[k].color = 1

        } else {
          this.partidos_ultimos_4_visitante[k].color = 0

        }
      }

      if (this.mercadoSeleccionado == "Mas 0,5 local") {
        if (goles_local>0) {
          this.partidos_ultimos_4_visitante[k].color = 1

        } else {
          this.partidos_ultimos_4_visitante[k].color = 0

        }
      }
      if (this.mercadoSeleccionado == "Mas 0,5 visitante") {
        if (goles_visitante>0) {
          this.partidos_ultimos_4_visitante[k].color = 1

        } else {
          this.partidos_ultimos_4_visitante[k].color = 0

        }
      }

      if (this.mercadoSeleccionado == "Menos 1,5 local") {
        if (goles_local<2) {
          this.partidos_ultimos_4_visitante[k].color = 1

        } else {
          this.partidos_ultimos_4_visitante[k].color = 0

        }
      }
      if (this.mercadoSeleccionado == "Menos 1,5 visitante") {
        if (goles_visitante<2) {
          this.partidos_ultimos_4_visitante[k].color = 1

        } else {
          this.partidos_ultimos_4_visitante[k].color = 0

        }
      }

      if (this.mercadoSeleccionado == "Menos 2,5 local") {
        if (goles_local<3) {
          this.partidos_ultimos_4_visitante[k].color = 1

        } else {
          this.partidos_ultimos_4_visitante[k].color = 0

        }
      }
      if (this.mercadoSeleccionado == "Menos 2,5 visitante") {
        if (goles_visitante<3) {
          this.partidos_ultimos_4_visitante[k].color = 1

        } else {
          this.partidos_ultimos_4_visitante[k].color = 0

        }
      }
    }


    for (var k = 0; k < this.partidos_ultimos_8_local.length; k++) {
      var partido = this.partidos_ultimos_8_local[k]
      console.log(partido)
      var goles = parseInt(partido.resultado_local) + parseInt(partido.resultado_visitante)
      var diferencia=parseInt(partido.resultado_local) - parseInt(partido.resultado_visitante)
      var goles_local=parseInt(partido.resultado_local)
      var goles_visitante=parseInt(partido.resultado_visitante)
      var nombre_local_partido=partido.nombre_local
      var nombre_visitante_partido=partido.nombre_visitante

      if (this.mercadoSeleccionado == "Mas 1,5 goles") {
        if (goles > 1) {
          this.partidos_ultimos_8_local[k].color = 1

        } else {
          this.partidos_ultimos_8_local[k].color = 0

        }
      }

      if (this.mercadoSeleccionado == "Mas 2,5 goles") {
        if (goles > 2) {
          this.partidos_ultimos_8_local[k].color = 1

        } else {
          this.partidos_ultimos_8_local[k].color = 0

        }
      }




      if (this.mercadoSeleccionado == "Menos 3,5 goles") {
        if (goles < 4) {
          this.partidos_ultimos_8_local[k].color = 1

        } else {
          this.partidos_ultimos_8_local[k].color = 0

        }
      }




      if (this.mercadoSeleccionado == "Menos 4,5 goles") {
        if (goles < 5) {
          this.partidos_ultimos_8_local[k].color = 1

        } else {
          this.partidos_ultimos_8_local[k].color = 0

        }
      }

      if (this.mercadoSeleccionado == "Handicap +1,5 local") {
        if(nombre_local_partido==this.nombreLocal){
          if (diferencia>=-1) {
            this.partidos_ultimos_8_local[k].color = 1
  
          } else {
            this.partidos_ultimos_8_local[k].color = 0
  
          }
        }else{
          if (diferencia<=1) {
            this.partidos_ultimos_8_local[k].color = 1
  
          } else {
            this.partidos_ultimos_8_local[k].color = 0
  
          }
        }

      }

      if (this.mercadoSeleccionado == "Handicap +1,5 visitante") {
        if(nombre_local_partido==this.nombreLocal){
          if (diferencia<=1) {
            this.partidos_ultimos_8_local[k].color = 1
  
          } else {
            this.partidos_ultimos_8_local[k].color = 0
  
          }
        }else{
          if (diferencia>=-1) {
            this.partidos_ultimos_8_local[k].color = 1
  
          } else {
            this.partidos_ultimos_8_local[k].color = 0
  
          }
        }
      }

      if (this.mercadoSeleccionado == "Handicap +0,5 local") {
        if(nombre_local_partido==this.nombreLocal){
          if (diferencia>=0) {
            this.partidos_ultimos_8_local[k].color = 1
  
          } else {
            this.partidos_ultimos_8_local[k].color = 0
  
          }
        }else{
          if (diferencia<=0) {
            this.partidos_ultimos_8_local[k].color = 1
  
          } else {
            this.partidos_ultimos_8_local[k].color = 0
  
          }
        }
      }

      if (this.mercadoSeleccionado == "Handicap +0,5 visitante") {
        if(nombre_local_partido==this.nombreLocal){
          if (diferencia<=0) {
            this.partidos_ultimos_8_local[k].color = 1
  
          } else {
            this.partidos_ultimos_8_local[k].color = 0
  
          }
        }else{
          if (diferencia>=0) {
            this.partidos_ultimos_8_local[k].color = 1
  
          } else {
            this.partidos_ultimos_8_local[k].color = 0
  
          }
        }
      }

      
      if (this.mercadoSeleccionado == "No empate") {
        if (diferencia!=0) {
          this.partidos_ultimos_8_local[k].color = 1

        } else {
          this.partidos_ultimos_8_local[k].color = 0

        }
      }

      if (this.mercadoSeleccionado == "Mas 0,5 local") {
        if(nombre_local_partido==this.nombreLocal){
          if (goles_local>0) {
            this.partidos_ultimos_8_local[k].color = 1
  
          } else {
            this.partidos_ultimos_8_local[k].color = 0
  
          }
        }else{
          if (goles_visitante>0) {
            this.partidos_ultimos_8_local[k].color = 1
  
          } else {
            this.partidos_ultimos_8_local[k].color = 0
  
          }
        }
      }
      if (this.mercadoSeleccionado == "Mas 0,5 visitante") {
        if(nombre_local_partido==this.nombreLocal){
          if (goles_visitante>0) {
            this.partidos_ultimos_8_local[k].color = 1
  
          } else {
            this.partidos_ultimos_8_local[k].color = 0
  
          }
        }else{
          if (goles_local>0) {
            this.partidos_ultimos_8_local[k].color = 1
  
          } else {
            this.partidos_ultimos_8_local[k].color = 0
  
          }
        }
      }

      if (this.mercadoSeleccionado == "Menos 1,5 local") {
        if(nombre_local_partido==this.nombreLocal){
          if (goles_local<2) {
            this.partidos_ultimos_8_local[k].color = 1
  
          } else {
            this.partidos_ultimos_8_local[k].color = 0
  
          }
        }else{
          if (goles_visitante<2) {
            this.partidos_ultimos_8_local[k].color = 1
  
          } else {
            this.partidos_ultimos_8_local[k].color = 0
  
          }
        }
      }
      if (this.mercadoSeleccionado == "Menos 1,5 visitante") {
        if(nombre_local_partido==this.nombreLocal){
          if (goles_visitante<2) {
            this.partidos_ultimos_8_local[k].color = 1
  
          } else {
            this.partidos_ultimos_8_local[k].color = 0
  
          }
        }else{
          if (goles_local<2) {
            this.partidos_ultimos_8_local[k].color = 1
  
          } else {
            this.partidos_ultimos_8_local[k].color = 0
  
          }
        }
      }

      if (this.mercadoSeleccionado == "Menos 2,5 local") {
        if(nombre_local_partido==this.nombreLocal){
          if (goles_local<3) {
            this.partidos_ultimos_8_local[k].color = 1
  
          } else {
            this.partidos_ultimos_8_local[k].color = 0
  
          }
        }else{
          if (goles_visitante<3) {
            this.partidos_ultimos_8_local[k].color = 1
  
          } else {
            this.partidos_ultimos_8_local[k].color = 0
  
          }
        }
      }
      if (this.mercadoSeleccionado == "Menos 2,5 visitante") {
        if(nombre_local_partido==this.nombreLocal){
          if (goles_visitante<3) {
            this.partidos_ultimos_8_local[k].color = 1
  
          } else {
            this.partidos_ultimos_8_local[k].color = 0
  
          }
        }else{
          if (goles_local<3) {
            this.partidos_ultimos_8_local[k].color = 1
  
          } else {
            this.partidos_ultimos_8_local[k].color = 0
  
          }
        }
      }
    }




    for (var k = 0; k < this.partidos_ultimos_8_visitante.length; k++) {
      var partido = this.partidos_ultimos_8_visitante[k]
      console.log(partido)
      var goles = parseInt(partido.resultado_local) + parseInt(partido.resultado_visitante)
      var diferencia=parseInt(partido.resultado_local) - parseInt(partido.resultado_visitante)
      var goles_local=parseInt(partido.resultado_local)
      var goles_visitante=parseInt(partido.resultado_visitante)
      var nombre_local_partido=partido.nombre_local
      var nombre_visitante_partido=partido.nombre_visitante

      if (this.mercadoSeleccionado == "Mas 1,5 goles") {
        if (goles > 1) {
          this.partidos_ultimos_8_visitante[k].color = 1

        } else {
          this.partidos_ultimos_8_visitante[k].color = 0

        }
      }

      if (this.mercadoSeleccionado == "Mas 2,5 goles") {
        if (goles > 2) {
          this.partidos_ultimos_8_visitante[k].color = 1

        } else {
          this.partidos_ultimos_8_visitante[k].color = 0

        }
      }




      if (this.mercadoSeleccionado == "Menos 3,5 goles") {
        if (goles < 4) {
          this.partidos_ultimos_8_visitante[k].color = 1

        } else {
          this.partidos_ultimos_8_visitante[k].color = 0

        }
      }




      if (this.mercadoSeleccionado == "Menos 4,5 goles") {
        if (goles < 5) {
          this.partidos_ultimos_8_visitante[k].color = 1

        } else {
          this.partidos_ultimos_8_visitante[k].color = 0

        }
      }

      if (this.mercadoSeleccionado == "Handicap +1,5 local") {
        if(nombre_visitante_partido==this.nombreVisitante){
           if (diferencia>=-1) {
             this.partidos_ultimos_8_visitante[k].color = 1
   
           } else {
             this.partidos_ultimos_8_visitante[k].color = 0
   
           }
         }else{
           if (diferencia<=1) {
             this.partidos_ultimos_8_visitante[k].color = 1
   
           } else {
             this.partidos_ultimos_8_visitante[k].color = 0
   
           }
         }
       }
 
       if (this.mercadoSeleccionado == "Handicap +1,5 visitante") {
         if(nombre_visitante_partido==this.nombreVisitante){
           if (diferencia<=1) {
             this.partidos_ultimos_8_visitante[k].color = 1
   
           } else {
             this.partidos_ultimos_8_visitante[k].color = 0
   
           }
         }else{
           if (diferencia>=-1) {
             this.partidos_ultimos_8_visitante[k].color = 1
   
           } else {
             this.partidos_ultimos_8_visitante[k].color = 0
   
           }
         }
       }
 
       if (this.mercadoSeleccionado == "Handicap +0,5 local") {
         if(nombre_visitante_partido==this.nombreVisitante){
           if (diferencia>=0) {
             this.partidos_ultimos_8_visitante[k].color = 1
   
           } else {
             this.partidos_ultimos_8_visitante[k].color = 0
   
           }
         }else{
           if (diferencia<=0) {
             this.partidos_ultimos_8_visitante[k].color = 1
   
           } else {
             this.partidos_ultimos_8_visitante[k].color = 0
   
           }
         }
       }
 
       if (this.mercadoSeleccionado == "Handicap +0,5 visitante") {
         if(nombre_visitante_partido==this.nombreVisitante){
           if (diferencia<=0) {
             this.partidos_ultimos_8_visitante[k].color = 1
   
           } else {
             this.partidos_ultimos_8_visitante[k].color = 0
   
           }
         }else{
           if (diferencia>=0) {
             this.partidos_ultimos_8_visitante[k].color = 1
   
           } else {
             this.partidos_ultimos_8_visitante[k].color = 0
   
           }
         }
       }

       if (this.mercadoSeleccionado == "No empate") {
        if (diferencia!=0) {
          this.partidos_ultimos_8_visitante[k].color = 1

        } else {
          this.partidos_ultimos_8_visitante[k].color = 0

        }
      }
 
       if (this.mercadoSeleccionado == "Mas 0,5 local") {
         if(nombre_visitante_partido==this.nombreVisitante){
           if (goles_local>0) {
             this.partidos_ultimos_8_visitante[k].color = 1
   
           } else {
             this.partidos_ultimos_8_visitante[k].color = 0
   
           }
         }else{
           if (goles_visitante>0) {
             this.partidos_ultimos_8_visitante[k].color = 1
   
           } else {
             this.partidos_ultimos_8_visitante[k].color = 0
   
           }
         }
       }
       if (this.mercadoSeleccionado == "Mas 0,5 visitante") {
         if(nombre_visitante_partido==this.nombreVisitante){
           if (goles_visitante>0) {
             this.partidos_ultimos_8_visitante[k].color = 1
   
           } else {
             this.partidos_ultimos_8_visitante[k].color = 0
   
           }
         }else{
           if (goles_local>0) {
             this.partidos_ultimos_8_visitante[k].color = 1
   
           } else {
             this.partidos_ultimos_8_visitante[k].color = 0
   
           }
         }
       }
 
       if (this.mercadoSeleccionado == "Menos 1,5 local") {
         if(nombre_visitante_partido==this.nombreVisitante){
           if (goles_local<2) {
             this.partidos_ultimos_8_visitante[k].color = 1
   
           } else {
             this.partidos_ultimos_8_visitante[k].color = 0
   
           }
         }else{
           if (goles_visitante<2) {
             this.partidos_ultimos_8_visitante[k].color = 1
   
           } else {
             this.partidos_ultimos_8_visitante[k].color = 0
   
           }
         }
       }
       if (this.mercadoSeleccionado == "Menos 1,5 visitante") {
         if(nombre_visitante_partido==this.nombreVisitante){
           if (goles_visitante<2) {
             this.partidos_ultimos_8_visitante[k].color = 1
   
           } else {
             this.partidos_ultimos_8_visitante[k].color = 0
   
           }
         }else{
           if (goles_local<2) {
             this.partidos_ultimos_8_visitante[k].color = 1
   
           } else {
             this.partidos_ultimos_8_visitante[k].color = 0
   
           }
         }
       }
 
       if (this.mercadoSeleccionado == "Menos 2,5 local") {
         if(nombre_visitante_partido==this.nombreVisitante){
           if (goles_local<3) {
             this.partidos_ultimos_8_visitante[k].color = 1
   
           } else {
             this.partidos_ultimos_8_visitante[k].color = 0
   
           }
         }else{
           if (goles_visitante<3) {
             this.partidos_ultimos_8_visitante[k].color = 1
   
           } else {
             this.partidos_ultimos_8_visitante[k].color = 0
   
           }
         }
       }
       if (this.mercadoSeleccionado == "Menos 2,5 visitante") {
         if(nombre_visitante_partido==this.nombreVisitante){
           if (goles_visitante<3) {
             this.partidos_ultimos_8_visitante[k].color = 1
   
           } else {
             this.partidos_ultimos_8_visitante[k].color = 0
   
           }
         }else{
           if (goles_local<3) {
             this.partidos_ultimos_8_visitante[k].color = 1
   
           } else {
             this.partidos_ultimos_8_visitante[k].color = 0
   
           }
         }
       }
    }



  }

}
