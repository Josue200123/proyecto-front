import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Moneda } from '../dto/Moneda';

@Injectable({
  providedIn: 'root'
})
export class MonedaService {
  private apiUrl = 'http://localhost:8080/moneda/listar';

  constructor(private http: HttpClient) { }

  listar(): Observable<{ data: Moneda[] }> {
    return this.http.get<{ data: Moneda[] }>(this.apiUrl);
  }
}

export type { Moneda };

