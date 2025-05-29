import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Equipaje } from '../dto/Equipaje';

@Injectable({
  providedIn: 'root'
})
export class EquipajeService {
  private apiUrl = 'http://localhost:8080/equipajes'; // Ajusta esta URL según tu backend

  constructor(private http: HttpClient) { }

  crear(equipaje: Equipaje): Observable<Equipaje> {
    return this.http.post<Equipaje>(this.apiUrl, equipaje);
  }

  listar(): Observable<Equipaje[]> {
    return this.http.get<Equipaje[]>(this.apiUrl);
  }

  obtenerPorId(id: number): Observable<Equipaje> {
    return this.http.get<Equipaje>(`${this.apiUrl}/${id}`);
  }

  actualizar(id: number, equipaje: Equipaje): Observable<Equipaje> {
    return this.http.put<Equipaje>(`${this.apiUrl}/${id}`, equipaje);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
