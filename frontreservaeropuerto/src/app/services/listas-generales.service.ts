import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListasGeneralesService {
  private apiUrl = 'http://localhost:8080/listasgenerales/registrar';

  constructor(private http: HttpClient) {}

  obtenerListas(nombres: string[]): Observable<any> {
    // Convierte el array de strings a array de objetos { nombre: string }
    const body = nombres.map(nombre => ({ nombre }));
    return this.http.post<any>(this.apiUrl, body);
  }
} 