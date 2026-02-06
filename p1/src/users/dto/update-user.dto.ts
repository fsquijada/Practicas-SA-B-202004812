import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
// Clase que se encargará para el control y validación de los datos de usuario para la actualización parcial
export class UpdateUserDto extends PartialType( CreateUserDto ) {}
