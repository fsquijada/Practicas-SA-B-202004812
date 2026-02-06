import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
// Para registrar los tipos de estado
export enum Estado {
  registrada = 'registrada',
  en_proceso = 'en_proceso',
  finalizada = 'finalizada',
}
// Modelo de usuario
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  area_solicitante: string;

  @Column()
  prioridad: number;

  @Column('decimal')
  costo_estimado: number;

  @Column({
    type: 'enum',
    enum: Estado,
  })
  estado: Estado;
}
