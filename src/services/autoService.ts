import { AutoDto } from '../interfaces/AutoDto';
import { Persona } from '../interfaces/Persona';
import { buscarPersona } from './personaService';

export function buscarAutos(dni: string, personas: Persona[]): AutoDto[] | undefined {
    const persona = buscarPersona(dni, personas);
    const autos = persona?.autos;
    return autos?.map((auto) => {
        return {
            marca: auto.marca,
            modelo: auto.modelo,
            patente: auto.patente
        };
    });
}
