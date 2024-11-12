import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'ejercicio' })
export class Ejercicio {
    @PrimaryGeneratedColumn({ name: 'idEjercicio' })
    idEjercicio: number

    @Column({ name: 'Ejercicio' })
    ejercicio: string
}