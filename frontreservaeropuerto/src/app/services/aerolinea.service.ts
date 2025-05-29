import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Aerolinea } from '../dto/Aerolinea'; // Asegúrate de crear este DTO

@Injectable({
  providedIn: 'root'
})
export class AerolineaService {
  private apiUrl = 'http://localhost:8080/aerolinea/listar';

  constructor(private http: HttpClient) { }

  listar(): Observable<{ data: Aerolinea[] }> {
    return this.http.get<{ data: Aerolinea[] }>(this.apiUrl);
  }
}
export type { Aerolinea };

