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
      driver: 'mysql2'
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
        ssl: {
    rejectUnauthorized: false,
  },
      extra: {
    ssl: {
      rejectUnauthorized: false,  // Ensure that the self-signed certificate is accepted
    },
        connectionLimit: 10,  // Example setting for connection pooling
    charset: 'utf8mb4_unicode_ci',  // Set the charset if needed
    authPlugins: {
      mysql_native_password: true,  // Explicitly use the native password plugin
    },
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
