import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reserva } from '../dto/Reserva';

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  private baseUrl = 'http://localhost:8080/reserva';

  constructor(private http: HttpClient) {}

  listar(): Observable<any> {
    return this.http.get(`${this.baseUrl}/listar`);
  }

  obtenerPorId(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  crear(reserva: Reserva): Observable<any> {
    return this.http.post(`${this.baseUrl}/registrar`, reserva);
  }

  actualizar(id: number, reserva: Reserva): Observable<any> {
    return this.http.put(`${this.baseUrl}/actualizar/${id}`, reserva);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/eliminar/${id}`);
  }
}

export type { Reserva };

