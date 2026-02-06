<h1 align="center">MANUAL TÉCNICO</h1>

El presente documento describe los aspectos técnicos informáticos de la aplicación REST de usuarios utilizando principios SOLID, de manera que cualquier técnico informático que posea los conocimientos necesarios, pueda entender y comprender la lógica dentro del programa, para así poder darle mantenimiento y de ser necesario, actualizar el mismo.

## Tabla de contenidos

- [Objetivos](#objetivos)
- [Conocimientos](#conocimientos)
- [Requerimientos](#requerimientos)
- [Principios Solid](#principios-solid)
  - [Single Responsibility Principle (SRP)](#single-responsibility-principle-srp)
  - [Open / Closed Principle (OCP)](#open-closed-principle-OCP)
  - [Liskov Substitution Principle (LSP)](#liskov-substitution-principle-lsp)
  - [Interface Segregation Principle (ISP)](#interface-segregation-principle-isp)
  - [Dependency Inversion Principle (DIP)](#dependency-inversion-principle-dip))
- [Referencias](#referencias)

## Objetivos

Instruir al lector para el uso adecuado del código del programa, así como dar a conocer la lógica detrás del mismo, de manera que el lector la pueda comprender para facilitar la manipulación que sea necesaria.

## Conocimientos

Los conocimientos previos que deberán tener las personas que manejen el programa son:
- NestJS
- api REST
- TypeORM
- PostgreSQL
- NeonDB

## Requerimientos

- Windows 7 o posterior, GNU Linux o Mac Os
- Cliente HTTP (Postman, Insomnia, etc)
- 2Gb RAM

## Principios Solid

En este proyecto se desarrolló un CRUD de usuarios utilizando las tecnologías mencionadas anteriormente. Durante el desarrollo se aplicaron los principios SOLID para mantener un código limpio, mantenible y fácil de extender.

A continuación se explican cada uno de los principios SOLID y cómo se aplican (o no) dentro del proyecto.

### Single Responsibility Principle (SRP)

El Principio de Responsabilidad Única indica que una clase debe tener una sola razón para cambiar. Esto quiere decir, cada clase o archivo debe encargarse de una sola tarea específica dentro del sistema.

Este principio se aplica claramente separando responsabilidades entre Controller, Service y Repository.

El módulo de `users.controller.ts` se responsabiliza de las peticiones HTTP.

```ts
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
```

El módulo de `users.service.ts` se responsabiliza de la lógica del módulo de usuarios. No sabe el cómo se guardan los datos sino solo lo delega.

```ts
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
```

El módulo de `users.repository.ts` se responsabiliza del acceso y gestión hacia la base de datos.

```ts
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
```

### Open Closed Principle (OCP)

El principio Abierto/Cerrado establece que el software debe estar abierto para extensión, pero cerrado para modificación.

Esto significa que se pueden agregar nuevas funcionalidades sin tener que estar modificando el código existente.

La aplicación de este principio se ve principalmente en el repositorio. Por ejemplo, si en el futuro se desea ya sea cambiar TypeORM por otro ORM, cambiar PostgreSQL por otro motor, agregar nuevos métodos, no es necesario modificar el controlador ni el servicio, solo el repositorio.

```ts
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>, // Aquí se puede cambiar el repositorio
  ) {}
  // Demás código
}
```

### Liskov Substitution Principle (LSP)

El principio de Sustitución de Liskov indica que una clase hija debe poder sustituir a su clase padre sin afectar el comportamiento del sistema.

En este proyecto no se utilizó herencia o interfaces y subinterfaces directamente, ya que el CRUD no lo requieria, por lo que tampoco hay algo que haga que rompa este principio.

### Interface Segregation Principle (ISP)

El principio de Segregación de Interfaces establece que ningún cliente debe depender de métodos que no utiliza. Esto lo que quiere decir, es que es mejor tener interfaces pequeñas y específicas que una grande con muchos métodos.

En este proyecto no se definieron interfaces explícitas ya que cada clase solo expone los métodos que realmente necesita. Esta es una gran ventaja de utiizar NestJS ya que se separan claramente las responsabilidades de los módulos.

### Dependency Inversion Principle (DIP)

El principio de Inversión de Dependencias dice que los módulos de alto nivel no deben depender de módulos de bajo nivel, sino de abstracciones.

Una de las ventajas de usar NestJS, es que esto se logra principalmente mediante inyección de dependencias.

El constructor del servicio de usuarios en `users.service.ts`

```ts
constructor(private readonly repository: UsersRepository) {}
```

El servicio no crea el repositorio, tampoco conoce detalles del ORM. Este recibe la dependencia desde el módulo `users.module.ts` de la siguiente manera

```ts
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
})
export class UsersModule {}
```

Esto permite que se crear instancias, se resuelvan las dependencias y de inyectarlas correctamente.


El proyecto en general prioriza claridad, mantenibilidad y simplicidad, aplicando SOLID de manera realista y justificada, sin forzar patrones innecesarios.

## Referencias

- https://docs.nestjs.com/
- https://typeorm.io/
- https://www.postgresql.org/docs/
- https://neon.com/docs/introduction
- https://www.freecodecamp.org/espanol/news/los-principios-solid-explicados-en-espanol/



