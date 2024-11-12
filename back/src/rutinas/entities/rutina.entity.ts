import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'rutina' })
export class Rutina {
    @PrimaryGeneratedColumn({ name: 'idRutina' })
    idRutina: number

    @Column({ name: 'idCategoria' })
    idCategoria: number // * Hace referencia a la ID de una entrada en la tabla 'categoria'.

    @Column({ name: 'Nombre' })
    nombre: string

    @Column({ name: 'Horario' })
    horario: string // ! No existe un tipo 'time' en TS, abría que ver que queda mejor acá.
}