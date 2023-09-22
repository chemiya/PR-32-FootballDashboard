import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApuestaDTO } from '../model/ApuestaDTO';

@Injectable({
  providedIn: 'root'
})
export class ConexionApiService {

  private apiUrl = 'http://localhost:3000/'; 

  constructor(private http: HttpClient) { }


  

  getDatosPartido(id:any): Observable<any[]> {//devuelvo array y obtiene array en la peticion
    return this.http.get<any[]>(this.apiUrl+"seleccionarPartido/"+id);
  }

  getPartidos(): Observable<string[]> {//devuelvo array y obtiene array en la peticion
    return this.http.get<string[]>(this.apiUrl+"buscarPartidos");
  }


}
