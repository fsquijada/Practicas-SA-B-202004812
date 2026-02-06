import { Controller, Get, Post, Patch, Body, Param, Put, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// Clase que controla las peticiones HTTP
@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() dto: CreateUserDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.service.update(+id, dto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  updateall(@Param('id') id: string, @Body() dto: CreateUserDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
