import { Type } from 'class-transformer';
import { IsDate, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'curso' })
export class Curso {
    @PrimaryGeneratedColumn({ name: 'idCurso' })
    idCurso: number

    @Column({ name: 'Categoria_idCategoria' })
    idCategoria: number // * Hace referencia a la id de la tabla "categoria".

    @Column({ name: 'Nombre' })
    nombre: string

    @Column({ name: 'Lunes' })
    lunes: boolean

    @Column({ name: 'Martes' })
    martes: boolean

    @Column({ name: 'Miercoles' })
    miercoles: boolean

    @Column({ name: 'Jueves' })
    jueves: boolean

    @Column({ name: 'Viernes' })
    viernes: boolean

    @Column({ name: 'Sabado' })
    sabado: boolean

    @Column({ name: 'Domingo' })
    domingo: boolean

    @Type(() => Date)
    @IsDate()
    @Column({ name: 'Fecha_Inicio' })
    fechaInicio: Date

    @Type(() => Date)
    @IsDate()
    @Column({ name: 'Fecha_Fin' })
    fechaFin: Date
}