export interface Reserva {
  id: number;
  numero_vuelos: number;
  valor: number;
  fecha_vuelos: string;
  hora: string;
  cliente_id: number;
  aerolinea_id: number;
  moneda_id: number;
  tipo_pago_id: number;
  origen_id: number;
  destino_id: number;
  valor_equipaje: number;
}
