import { Genero } from './Genero';

export interface Persona {
    nombre: string;
    apellido: string;
    dni: string;
    fechaDeNacimiento: Date;
    genero: Genero;
    esDonante: boolean;
    autos: UUID[];
}

export type UUID = string;

export type withId<T> = T & { _id: UUID };
