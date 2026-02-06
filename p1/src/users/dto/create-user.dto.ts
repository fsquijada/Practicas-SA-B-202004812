import {
  IsString,
  IsInt,
  Min,
  Max,
  IsEnum,
  IsNumber,
  IsNotEmpty
} from 'class-validator';

export enum Estado {
  registrada = 'registrada',
  en_proceso = 'en_proceso',
  finalizada = 'finalizada',
}
// Clase que se encargará para el control y validación de los datos de usuario
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  area_solicitante: string;

  @IsInt()
  @Min(1)
  @Max(5)
  prioridad: number;

  @IsNumber()
  costo_estimado: number;

  @IsEnum(Estado)
  estado: Estado;
}
