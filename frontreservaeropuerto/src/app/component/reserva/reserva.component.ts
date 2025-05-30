import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { FormularioClienteComponent } from '../clientes/formulario-cliente.component';

import { ReservaService } from '../../services/reserva.service';
import { ClientesService } from '../../services/clientes.service';
import { ListasGeneralesService } from '../../services/listas-generales.service';

// Validador personalizado para ciudades diferentes
export function ciudadesDiferentesValidator(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const origen = group.get('origen_id')?.value;
    const destino = group.get('destino_id')?.value;
    if (origen && destino && origen === destino) {
      return { ciudadesIguales: true };
    }
    return null;
  };
}

@Component({
  selector: 'app-reserva',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    FormularioClienteComponent,
  ],
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {
  reservaForm: FormGroup;
  clientes: any[] = [];
  aerolineas: any[] = [];
  monedas: any[] = [];
  tiposPago: any[] = [];
  ciudades: any[] = [];
  clienteEncontrado: any = null;
  mostrarFormularioCliente = false;
  minFecha: Date = new Date();
  mensajeExito: string | null = null;

  constructor(
    private fb: FormBuilder,
    private reservaService: ReservaService,
    private listasGeneralesService: ListasGeneralesService,
    private clientesService: ClientesService, // Solo para buscar por ID
    private snackBar: MatSnackBar
  ) {
    this.reservaForm = this.fb.group({
      id: ['', [Validators.required, Validators.min(1)]],
      numero_vuelos: ['', [Validators.required, Validators.min(1)]],
      valor: ['', [Validators.required, Validators.min(0)]],
      fecha_vuelos: ['', Validators.required],
      hora: ['', Validators.required],
      cliente_id: ['', Validators.required],
      aerolinea_id: ['', Validators.required],
      moneda_id: ['', Validators.required],
      tipo_pago_id: ['', Validators.required],
      origen_id: ['', Validators.required],
      destino_id: ['', Validators.required],
      valor_equipaje: ['', [Validators.required, Validators.min(0)]]
    }, { validators: [ciudadesDiferentesValidator()] });
  }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.listasGeneralesService.obtenerListas(['aerolinea', 'moneda', 'ciudad', 'tipopago', 'cliente'])
      .subscribe(
        (response: any) => {
          const data = response.data?.generalData || {};
          this.aerolineas = data.aerolinea || [];
          this.monedas = data.moneda || [];
          this.ciudades = data.ciudad || [];
          this.tiposPago = data.tipopago || [];
          this.clientes = data.cliente || [];
        },
        (error: any) => {
          console.error('Error real al cargar listas generales:', error);
          const mensaje = error?.error?.mensaje || error?.message || JSON.stringify(error) || 'Error al cargar listas generales';
          this.mostrarError(mensaje);
        }
      );
  }

  onSubmit(): void {
    if (this.reservaForm.valid) {
      const reserva = this.reservaForm.value;
      this.reservaService.crear(reserva).subscribe(
        response => {
          this.mensajeExito = '¡Reserva creada exitosamente!';
          this.mostrarExito('Reserva creada exitosamente');
          this.reservaForm.reset();
          setTimeout(() => this.mensajeExito = null, 5000);
        },
        error => {
          if (error.error && error.error.mensaje && error.error.mensaje.includes('ID')) {
            this.mostrarError('El ID ya existe, ingresa uno diferente');
          } else {
            this.mostrarError('Error al crear la reserva');
          }
        }
      );
    }
  }

  mostrarExito(mensaje: string): void {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });
  }

  mostrarError(mensaje: string): void {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['error-snackbar']
    });
  }

  trackById(index: number, item: any): number {
    return item.id;
  }

  buscarCliente() {
    const id = this.reservaForm.get('cliente_id')?.value;
    if (!id) return;
    this.clientesService.obtenerPorId(id).subscribe(
      (response: any) => {
        if (response.data) {
          this.clienteEncontrado = response.data;
          this.mostrarFormularioCliente = false;
        } else {
          this.clienteEncontrado = null;
          this.mostrarFormularioCliente = true;
        }
      },
      (error: any) => {
        this.clienteEncontrado = null;
        this.mostrarFormularioCliente = true;
      }
    );
  }

  onClienteCreado(cliente: any) {
    this.clienteEncontrado = cliente;
    this.mostrarFormularioCliente = false;
    this.reservaForm.patchValue({ cliente_id: cliente.id });
  }
} 