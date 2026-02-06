import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

// Clase que maneja la gestión hacia la base de datos
@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  create(data: Partial<User>) {
    return this.repo.save(data);
  }

  findAll() {
    return this.repo.find();
  }

  findById(id: number) {
    return this.repo.findOneBy({ id });
  }

  update(id: number, data: Partial<User>) {
    return this.repo.update(id, data);
  }

  delete(id: number) {
    return this.repo.delete(id);
  }
}
