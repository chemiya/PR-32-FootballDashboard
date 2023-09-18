const fs = require('fs');
const readline = require('readline');

const Apuesta = require('./model/apuesta.js');




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
    var apuestas=[];
    var partidos=[];
    
    for (i=0;i<separadas_apuestas.length;i++){
        var separado=separadas_apuestas[i].split("\t")
        var apuesta=new Apuesta(separado[0],separado[1],separado[2],separado[3],separado[4],separado[5],separado[6],separado[7],separado[8],separado[9],separado[10],separado[11],separado[12],separado[13],separado[14],separado[15],separado[16],separado[17])
        apuestas.push(apuesta)
        var nombre_partido=apuesta.nombre_local+"-"+apuesta.nombre_visitante
        if(!partidos.includes(nombre_partido) && !nombre_partido.includes("undefined")&& !nombre_partido.includes("nombre local") ){
          partidos.push(nombre_partido)
        }
    }


    
    return [apuestas,partidos];
  }




  function procesarEstadisticas(rutaArchivo,nombre_local,nombre_visitante, callback) {
    fs.readFile(rutaArchivo, 'utf8', (err, data) => {
      if (err) {
        callback(err, null); 
        return;
      }
  
      
      const valorProcesado = procesarDatosEstadisticas(data,nombre_local,nombre_visitante);
  
      callback(null, valorProcesado);
    });
  }
  
  function procesarDatosEstadisticas(data,nombre_local,nombre_visitante) {
    var separados=data.split("InicioEquipo")
    var datos_equipo=[]
    
    for (i=0;i<separados.length;i++){
      var separados_interior=separados[i].split("\n")
      console.log(separados_interior)
      //console.log(nombre_local+"  "+nombre_visitante+"  "+separados_interior[1])
      if(separados_interior[1]===nombre_local || separados_interior[1]===nombre_visitante){
        datos_equipo.push(separados[i])
        
        
      }
    }


    
    return datos_equipo;
  }

module.exports = { procesarApuestas,procesarEstadisticas};