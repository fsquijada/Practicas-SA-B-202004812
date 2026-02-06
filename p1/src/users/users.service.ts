import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// Clase que maneja la lógica de usuarios
@Injectable()
export class UsersService {
  constructor(private readonly repository: UsersRepository) {}

  create(dto: CreateUserDto) {
    return this.repository.create(dto);
  }

  findAll() {
    return this.repository.findAll();
  }

  update(id: number, dto: UpdateUserDto) {
    return this.repository.update(id, dto);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
