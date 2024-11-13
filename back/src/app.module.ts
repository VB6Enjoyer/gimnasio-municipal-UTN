import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { CategoriasModule } from './categorias/categorias.module';
import { CursosModule } from './cursos/cursos.module';
import { EjerciciosModule } from './ejercicios/ejercicios.module';
import { ElementosModule } from './elementos/elementos.module';
import { RutinasModule } from './rutinas/rutinas.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
        ssl: {
    rejectUnauthorized: true,
  },
      autoLoadEntities: true,
      synchronize: false,
      logger: 'advanced-console'
    }),
    AuthModule,
    CategoriasModule,
    CursosModule,
    EjerciciosModule,
    ElementosModule,
    RutinasModule,
    JwtModule.register({
      global: true,
      secret: 'utn',
      signOptions: {
        expiresIn: '24h'
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
