import { AutoResponse } from './AutoResponse';

export interface PersonaResponse {
    nombre: string;
    apellido: string;
    dni: string;
    autos: AutoResponse[];
}
