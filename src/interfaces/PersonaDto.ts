import { AutoDto } from './AutoDto';

export interface PersonaDto {
    nombre: string;
    apellido: string;
    dni: string;
    autos: AutoDto[];
}
