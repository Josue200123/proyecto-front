import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

// Angular Material Modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

// Services and Interfaces
import { EquipajeService } from '../../services/equipaje.service';
import { MonedaService } from '../../services/moneda.service';
import { Equipaje } from '../../dto/Equipaje';
import { Moneda } from '../../dto/Moneda';

@Component({
  selector: 'app-equipaje',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule
  ],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Registro de Equipaje</mat-card-title>
      </mat-card-header>
      
      <mat-card-content>
        <form [formGroup]="equipajeForm" (ngSubmit)="onSubmit()">
          <mat-form-field appearance="fill" class="full-width">
            <mat-label>Tipo de Equipaje</mat-label>
            <mat-select formControlName="tipoEquipaje" required>
              <mat-option value="MANO">Equipaje de Mano</mat-option>
              <mat-option value="BODEGA">Equipaje de Bodega</mat-option>
              <mat-option value="ESPECIAL">Equipaje Especial</mat-option>
            </mat-select>
            <mat-error *ngIf="equipajeForm.get('tipoEquipaje')?.hasError('required')">
              El tipo de equipaje es requerido
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="fill" class="full-width">
            <mat-label>Peso (kg)</mat-label>
            <input matInput type="number" formControlName="peso" required>
            <mat-error *ngIf="equipajeForm.get('peso')?.hasError('required')">
              El peso es requerido
            </mat-error>
            <mat-error *ngIf="equipajeForm.get('peso')?.hasError('min')">
              El peso debe ser mayor a 0
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="fill" class="full-width">
            <mat-label>Precio</mat-label>
            <input matInput type="number" formControlName="precio" required>
            <mat-error *ngIf="equipajeForm.get('precio')?.hasError('required')">
              El precio es requerido
            </mat-error>
            <mat-error *ngIf="equipajeForm.get('precio')?.hasError('min')">
              El precio debe ser mayor a 0
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="fill" class="full-width">
            <mat-label>Moneda</mat-label>
            <mat-select formControlName="monedaId" required>
              <mat-option *ngFor="let moneda of monedas; trackBy: trackById" [value]="moneda.id">
                {{ moneda.tipo_moneda }}
              </mat-option>
            </mat-select>
            <mat-error *ngIf="equipajeForm.get('monedaId')?.hasError('required')">
              La moneda es requerida
            </mat-error>
          </mat-form-field>

          <div class="button-row">
            <button mat-raised-button color="primary" type="submit" [disabled]="equipajeForm.invalid">
              Guardar Equipaje
            </button>
            <button mat-button type="button" (click)="resetForm()">
              Limpiar
            </button>
          </div>
        </form>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .full-width {
      width: 100%;
      margin-bottom: 15px;
    }
    .button-row {
      display: flex;
      gap: 10px;
      margin-top: 20px;
    }
    mat-card {
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
    }
  `]
})
export class EquipajeComponent implements OnInit {
  equipajeForm: FormGroup;
  monedas: Moneda[] = [];

  constructor(
    private fb: FormBuilder,
    private equipajeService: EquipajeService,
    private monedaService: MonedaService,
    private snackBar: MatSnackBar
  ) {
    this.equipajeForm = this.fb.group({
      tipoEquipaje: ['', Validators.required],
      peso: ['', [Validators.required, Validators.min(0)]],
      precio: ['', [Validators.required, Validators.min(0)]],
      monedaId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarMonedas();
  }

  cargarMonedas(): void {
    this.monedaService.listar().subscribe({
      next: (data) => this.monedas = data,
      error: (error) => {
        console.error('Error al cargar monedas:', error);
        this.mostrarMensaje('Error al cargar las monedas');
      }
    });
  }

  onSubmit(): void {
    if (this.equipajeForm.valid) {
      const equipajeData: Equipaje = this.equipajeForm.value;
      
      this.equipajeService.crear(equipajeData).subscribe({
        next: () => {
          this.mostrarMensaje('Equipaje registrado exitosamente');
          this.resetForm();
        },
        error: (error) => {
          console.error('Error al guardar equipaje:', error);
          this.mostrarMensaje('Error al guardar el equipaje');
        }
      });
    }
  }

  resetForm(): void {
    this.equipajeForm.reset();
  }

  mostrarMensaje(mensaje: string): void {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  trackById(index: number, item: any): number {
    return item.id;
  }
}
