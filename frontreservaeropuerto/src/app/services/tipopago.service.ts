import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoPago } from '../dto/TipoPago';

@Injectable({
  providedIn: 'root'
})
export class TipopagoService {
  private apiUrl = 'http://localhost:8080/tipopago/listar';

  constructor(private http: HttpClient) { }

  listar(): Observable<{ data: TipoPago[] }> {
    return this.http.get<{ data: TipoPago[] }>(this.apiUrl);
  }
}

export type { TipoPago };

