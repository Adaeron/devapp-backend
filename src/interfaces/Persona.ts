import { Genero } from './Genero';
import { Auto } from './Auto';

export interface Persona {
    nombre: string;
    apellido: string;
    dni: string;
    fechaDeNacimiento: Date;
    genero: Genero;
    esDonante: boolean;
    autos: Auto[];
}
