import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClientesService } from '../../services/clientes.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-formulario-cliente',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <form [formGroup]="clienteForm" (ngSubmit)="onSubmit()">
      <mat-form-field appearance="outline">
        <mat-label>Nombre</mat-label>
        <input matInput formControlName="nombre" required>
      </mat-form-field>
      <mat-form-field appearance="outline">
        <mat-label>Fecha de nacimiento</mat-label>
        <input matInput type="date" formControlName="fecha_nacimiento" required>
      </mat-form-field>
      <mat-form-field appearance="outline">
        <mat-label>Teléfono</mat-label>
        <input matInput formControlName="telefono" required>
      </mat-form-field>
      <mat-form-field appearance="outline">
        <mat-label>Email</mat-label>
        <input matInput type="email" formControlName="email" required>
        <mat-error *ngIf="clienteForm.get('email')?.hasError('required')">
          El correo es obligatorio
        </mat-error>
        <mat-error *ngIf="clienteForm.get('email')?.hasError('email') && !clienteForm.get('email')?.hasError('required')">
          El correo no es válido
        </mat-error>
      </mat-form-field>
      <button mat-raised-button color="primary" type="submit" [disabled]="!clienteForm.valid">Crear Cliente</button>
    </form>
  `,
  styles: [`form { display: flex; flex-direction: column; gap: 10px; }`]
})
export class FormularioClienteComponent {
  @Input() id: number | null = null;
  @Output() clienteCreado = new EventEmitter<any>();
  clienteForm: FormGroup;

  constructor(private fb: FormBuilder, private clientesService: ClientesService) {
    this.clienteForm = this.fb.group({
      nombre: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.clienteForm.valid && this.id != null) {
      const cliente = { ...this.clienteForm.value, id: this.id };
      this.clientesService.crear(cliente).subscribe(
        response => {
          this.clienteCreado.emit(cliente);
          this.clienteForm.reset();
        },
        error => {
          alert('Error al crear el cliente');
        }
      );
    }
  }
} 