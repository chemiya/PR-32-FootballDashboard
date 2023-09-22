const express = require('express');
const app = express();
const Procesamiento = require('./Procesamiento');
const port = 3000;
const cors = require('cors')
app.use(cors())
var apuestas=[]
var apuestas_seleccionadas=[]
var partidos=[]
var estadisticas_local;
var estadisticas_visitante;
var clasificaciones;

app.use(express.json());


app.get('/buscarPartidos', (req, res) => {

  Procesamiento.procesarApuestas('./fichero-apuestas/apuestas.txt', (err, resultado) => {
    if (err) {
      console.error('Error:', err);
      return;
    }
    apuestas= resultado[0];
    partidos=resultado[1]
    res.json(partidos)
  });

  
  
});




app.get('/seleccionarPartido/:id', (req, res) => {
  const id=req.params.id
  var partido=partidos[id]
  var nombres=partido.split("-")
  Procesamiento.procesarEstadisticas('./fichero-apuestas/datos.txt',nombres[0],nombres[1], (err, resultado) => {
    if (err) {
      console.error('Error:', err);
      return;
    }
  estadisticas=resultado
  estadisticas_local=estadisticas[0]
  estadisticas_visitante=estadisticas[1]
  clasificaciones=estadisticas[2]
  //console.log(estadisticas_local)
  //console.log(estadisticas_visitante)
 
  apuestas_seleccionadas=apuestas.filter(apuesta=>apuesta.nombre_local==nombres[0])
  var respuestaJSON={
    apuestas_seleccionadas:apuestas_seleccionadas,
    estadisticas_local:estadisticas_local,
    estadisticas_visitante:estadisticas_visitante,
    clasificaciones:clasificaciones
  }
  res.json(respuestaJSON)

  });





  
  
});













app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});


