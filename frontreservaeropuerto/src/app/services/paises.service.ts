import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paises } from '../dto/Paises';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {
  private apiUrl = 'http://localhost:8080/paises';

  constructor(private http: HttpClient) { }

  getPaises(): Observable<Paises[]> {
    return this.http.get<Paises[]>(this.apiUrl);
  }
}
