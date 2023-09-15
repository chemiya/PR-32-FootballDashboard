const express = require('express');
const app = express();
const Procesamiento = require('./Procesamiento');
const port = 3000;
var apuestas=[]
var ligas=[]
var partidos=[]

app.use(express.json());


app.get('/arrancar', (req, res) => {
  apuestas=Procesamiento.procesarApuestas()
  
});





app.get('/mostrarPartidosLiga/:liga', (req, res) => {
  const liga = parseInt(req.params.liga);
 
});









app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});


