import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Clientes } from '../dto/Clientes';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private apiUrl = 'http://localhost:8080/clientes/listar';
  private apiBase = 'http://localhost:8080/clientes';

  constructor(private http: HttpClient) { }

  listar(): Observable<{ data: Clientes[] }> {
    return this.http.get<{ data: Clientes[] }>(this.apiUrl);
  }

  obtenerPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiBase}/${id}`);
  }

  crear(cliente: Clientes): Observable<any> {
    return this.http.post('http://localhost:8080/clientes/registrar', cliente);
  }
}
export type { Clientes };