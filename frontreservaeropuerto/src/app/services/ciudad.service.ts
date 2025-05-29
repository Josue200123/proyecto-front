import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ciudad } from '../dto/Ciudad';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {
  private apiUrl = 'http://localhost:8080/ciudad/listar';

  constructor(private http: HttpClient) { }

  listar(): Observable<{ data: Ciudad[] }> {
    return this.http.get<{ data: Ciudad[] }>(this.apiUrl);
  }
}
export type { Ciudad };
