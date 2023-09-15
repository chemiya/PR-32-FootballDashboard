const fs = require('fs');
const readline = require('readline');

function procesarApuestas(){
    

 

    const archivo = './fichero-apuestas/apuestas.txt';

    const rl = readline.createInterface({
    input: fs.createReadStream(archivo),
    output: process.stdout,
    terminal: false
    });

    // Función que se ejecutará para cada línea leída
    rl.on('line', (line) => {
        var separado=line.split("\t")
        Apuesta apuesta=new Apuesta(separado[0],separado[1],separado[2],separado[3],separado[4],separado[5],separado[0],separado[0],separado[0],separado[0],separado[0],)
    });

}

module.exports = { procesarApuestas };