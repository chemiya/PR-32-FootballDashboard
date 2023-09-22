const fs = require('fs');
const readline = require('readline');

const Apuesta = require('./model/apuesta.js');
const Partido = require('./model/partido.js');
const EquipoDatos = require('./model/equipoDatos.js');
const Clasificacion = require('./model/clasificacion.js');
const ClasificacionRecopilacion = require('./model/clasificacionRecopilacion.js');




//var apuesta=new Apuesta(separado[0],separado[1],separado[2],separado[3],separado[4],separado[5],separado[6],separado[7],separado[8],separado[9],separado[10],separado[11],separado[12],separado[13],separado[14],separado[15],separado[16],separado[17])

function procesarApuestas(rutaArchivo, callback) {
  fs.readFile(rutaArchivo, 'utf8', (err, data) => {
    if (err) {
      callback(err, null);
      return;
    }


    const valorProcesado = procesarDatosApuestas(data);

    callback(null, valorProcesado);
  });
}

function procesarDatosApuestas(data) {
  const separadas_apuestas = data.split('\r\n');
  var apuestas = [];
  var partidos = [];

  for (i = 0; i < separadas_apuestas.length; i++) {
    var separado = separadas_apuestas[i].split("\t")
    var apuesta = new Apuesta(separado[0], separado[1], separado[2], separado[3], separado[4], separado[5], separado[6], separado[7], separado[8], separado[9], separado[10], separado[11], separado[12], separado[13], separado[14], separado[15], separado[16], separado[17])
    apuestas.push(apuesta)
    var nombre_partido = apuesta.nombre_local + "-" + apuesta.nombre_visitante
    if (!partidos.includes(nombre_partido) && !nombre_partido.includes("undefined") && !nombre_partido.includes("nombre local")) {
      partidos.push(nombre_partido)
    }
  }



  return [apuestas, partidos];
}




function procesarEstadisticas(rutaArchivo, nombre_local, nombre_visitante, callback) {
  fs.readFile(rutaArchivo, 'utf8', (err, data) => {
    if (err) {
      callback(err, null);
      return;
    }


    const valorProcesado = procesarDatosEstadisticas(data, nombre_local, nombre_visitante);

    callback(null, valorProcesado);
  });
}

function procesarDatosEstadisticas(data, nombre_local, nombre_visitante) {
  var separados = data.split("InicioEquipo;")
  var datos_equipo = []
  var limpios = data.split("\n")
  var clasificacion_equipos = []


  for (i = 0; i < separados.length; i++) {
    //console.log(separados[i])
    var datos_equipo_separados = separados[i].split(";")
    var indices = []
    if (datos_equipo_separados.length > 10) {

      //console.log("equipo")
      for (k = 0; k < datos_equipo_separados.length; k++) {
        if (datos_equipo_separados[k] == "indicadores") {
          indices.push(k)

        }
        if (datos_equipo_separados[k] == "partidos_local") {
          indices.push(k)

        }
        if (datos_equipo_separados[k] == "partidos_visitante") {
          indices.push(k)

        }
        if (datos_equipo_separados[k] == "partidos_total") {
          indices.push(k)

        }
        if (datos_equipo_separados[k] == "partidos_4_ultimos_local") {
          indices.push(k)

        }

        if (datos_equipo_separados[k] == "partidos_4_ultimos_visitante") {
          indices.push(k)

        }
        if (datos_equipo_separados[k] == "partidos_8_ultimos_total") {
          indices.push(k)

        }
      }

      if (datos_equipo_separados[0] == nombre_local || datos_equipo_separados[0] == nombre_visitante) {
        //console.log(indices)
        var indicadores = datos_equipo_separados[indices[0] + 1].split("|")
        var partidos_local = []
        var partidos_visitante = []
        var partidos_total = []
        var partidos_4_ultimos_local = []
        var partidos_4_ultimos_visitante = []
        var partidos_8_ultimos_total = []

        for (j = indices[1] + 1; j < indices[2]; j++) {
          var partido_separado = datos_equipo_separados[j].split("|")
          var partido = new Partido(partido_separado[0], partido_separado[1], partido_separado[2], partido_separado[3])
          partidos_local.push(partido)
        }

        for (j = indices[2] + 1; j < indices[3]; j++) {
          var partido_separado = datos_equipo_separados[j].split("|")
          var partido = new Partido(partido_separado[0], partido_separado[1], partido_separado[2], partido_separado[3])
          partidos_visitante.push(partido)
        }

        for (j = indices[3] + 1; j < indices[4]; j++) {
          var partido_separado = datos_equipo_separados[j].split("|")
          var partido = new Partido(partido_separado[0], partido_separado[1], partido_separado[2], partido_separado[3])
          partidos_total.push(partido)
        }

        for (j = indices[4] + 1; j < indices[5]; j++) {
          var partido_separado = datos_equipo_separados[j].split("|")
          var partido = new Partido(partido_separado[0], partido_separado[1], partido_separado[2], partido_separado[3])
          partidos_4_ultimos_local.push(partido)
        }


        for (j = indices[5] + 1; j < indices[6]; j++) {
          var partido_separado = datos_equipo_separados[i].split("|")
          var partido = new Partido(partido_separado[0], partido_separado[1], partido_separado[2], partido_separado[3])
          partidos_4_ultimos_visitante.push(partido)
        }

        for (j = indices[6] + 1; j < datos_equipo_separados.length - 1; j++) {
          var partido_separado = datos_equipo_separados[j].split("|")
          var partido = new Partido(partido_separado[0], partido_separado[1], partido_separado[2], partido_separado[3])
          partidos_8_ultimos_total.push(partido)
        }


        for (t = 0; t < indicadores.length; t++) {
          indicadores[t] = parseFloat(indicadores[t])
        }
        var equipoDatos = new EquipoDatos(datos_equipo_separados[0], indicadores, partidos_local, partidos_visitante, partidos_total, partidos_4_ultimos_local, partidos_4_ultimos_visitante, partidos_8_ultimos_total)
        datos_equipo.push(equipoDatos)
        var equipoDatos = new Clasificacion(datos_equipo_separados[0], indicadores)
        clasificacion_equipos.push(equipoDatos)

      } else {
        var indicadores = datos_equipo_separados[indices[0] + 1].split("|")
        for (t = 0; t < indicadores.length; t++) {
          indicadores[t] = parseFloat(indicadores[t])
        }
        var equipoDatos = new Clasificacion(datos_equipo_separados[0], indicadores)
        clasificacion_equipos.push(equipoDatos)
      }



    }


  }


  var clasificaciones_posiciones = new ClasificacionRecopilacion()

  for (g = 0; g < 12; g++) {
   
    var ordenado = clasificacion_equipos.sort((a, b) => b.indicadores[g] - a.indicadores[g]);
    for (q = 0; q < ordenado.length; q++) {
      if(g==0){
        if (ordenado[q].nombre == nombre_local) {
          clasificaciones_posiciones.clasificacion_puntos_local=q+1
        }
      }
      if(g==1){
        if (ordenado[q].nombre == nombre_visitante) {
          clasificaciones_posiciones.clasificacion_puntos_visitante=q+1
        }
      }
      if(g==2){
        if (ordenado[q].nombre == nombre_local) {
          clasificaciones_posiciones.clasificacion_puntos_total[0]=q+1
        }
        if (ordenado[q].nombre == nombre_visitante) {
          clasificaciones_posiciones.clasificacion_puntos_total[1]=q+1
        }
      }

      if(g==3){
        if (ordenado[q].nombre == nombre_local) {
          clasificaciones_posiciones.clasificacion_goles_local=q+1
        }
      }
      if(g==4){
        if (ordenado[q].nombre == nombre_visitante) {
          clasificaciones_posiciones.clasificacion_goles_visitante=q+1
        }
      }
      if(g==5){
        if (ordenado[q].nombre == nombre_local) {
          clasificaciones_posiciones.clasificacion_goles_total[0]=q+1
        }
        if (ordenado[q].nombre == nombre_visitante) {
          clasificaciones_posiciones.clasificacion_goles_total[1]=q+1
        }
      }

      if(g==6){
        if (ordenado[q].nombre == nombre_local) {
          clasificaciones_posiciones.clasificacion_goles_marcados_local=q+1
        }
      }
      if(g==7){
        if (ordenado[q].nombre == nombre_visitante) {
          clasificaciones_posiciones.clasificacion_goles_marcados_visitante=q+1
        }
      }
      if(g==8){
        if (ordenado[q].nombre == nombre_local) {
          clasificaciones_posiciones.clasificacion_goles_marcados_total[0]=q+1
        }
        if (ordenado[q].nombre == nombre_visitante) {
          clasificaciones_posiciones.clasificacion_goles_marcados_total[1]=q+1
        }
      }

      if(g==9){
        if (ordenado[q].nombre == nombre_local) {
          clasificaciones_posiciones.clasificacion_goles_encajados_local=q+1
        }
      }
      if(g==10){
        if (ordenado[q].nombre == nombre_visitante) {
          clasificaciones_posiciones.clasificacion_goles_encajados_visitante=q+1
        }
      }
      if(g==11){
        if (ordenado[q].nombre == nombre_local) {
          clasificaciones_posiciones.clasificacion_goles_encajados_total[0]=q+1
        }
        if (ordenado[q].nombre == nombre_visitante) {
          clasificaciones_posiciones.clasificacion_goles_encajados_total[1]=q+1
        }
      }



    }

  }

datos_equipo.push(clasificaciones_posiciones)

  return datos_equipo;
}

module.exports = { procesarApuestas, procesarEstadisticas };