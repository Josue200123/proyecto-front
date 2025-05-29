import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CiudadService } from '../../services/ciudad.service';

@Component({
  selector: 'app-ciudad',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ciudad.component.html',
  styleUrl: './ciudad.component.css'
})
export class CiudadComponent implements OnInit {
  ciudades: any[] = [];

  constructor(private ciudadService: CiudadService) {}

  ngOnInit() {
    this.cargarCiudades();
  }

  cargarCiudades() {
    this.ciudadService.getCiudades().subscribe({
      next: (data) => {
        this.ciudades = data;
      },
      error: (error) => {
        console.error('Error al cargar ciudades:', error);
      }
    });
  }
}
