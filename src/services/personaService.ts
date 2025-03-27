import { Persona } from '../interfaces/Persona';
import { PersonaResponse } from '../interfaces/PersonasResponse';

export function buscarPersonas(personas: Persona[]): PersonaResponse[] {
    return personas.map((persona) => {
        return {
            nombre: persona.nombre,
            apellido: persona.apellido,
            dni: persona.dni,
            autos: persona.autos.map((auto) => {
                return {
                    marca: auto.marca,
                    modelo: auto.modelo,
                    anio: auto.anio,
                    patente: auto.patente
                };
            })
        };
    });
}
