import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComunicacionService {

  private array_apuestas_seleccionadas: any[]=[];

  pushArrayApuestasSeleccionadas(elemento: any) {
    this.array_apuestas_seleccionadas.push(elemento);
  }

  getArrayApuestasSeleccionadas() {
    return this.array_apuestas_seleccionadas;
  }
}
