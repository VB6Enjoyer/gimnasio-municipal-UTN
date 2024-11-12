import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RolesEnum } from '../enums/roles.enum';

@Entity({ name: 'usuario' })
export class Usuario {
    @PrimaryGeneratedColumn({ name: 'idUsuario' })
    idUsuario: number

    @Column({ name: 'Usuario' })
    username: string

    @Exclude()
    @Column({ name: 'Contrasena' })
    password: string

    @Column({ name: 'Nombre' })
    nombre: string

    @Column({ name: 'Apellido' })
    apellido: string

    @Column({ name: 'Documento' })
    documento: string // * Esto es una string en la DB.

    @Column({ name: 'Telefono' })
    telefono: string // * También es una string en la DB.

    @Column({ name: 'Email' })
    email: string

    @Column({ name: 'Direccion' })
    direccion: string

    @Column({ name: 'FechaNacimiento' })
    fechaNacimiento: Date // * YYYY-MM-DD

    @Column({ type: 'enum', enum: RolesEnum, name: 'Rol' })
    rol: RolesEnum
}