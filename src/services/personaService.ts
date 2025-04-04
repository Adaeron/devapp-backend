import { Genero } from '../interfaces/Genero';
import { Persona } from '../interfaces/Persona';
import { PersonaDto } from '../interfaces/PersonaDto';

export function buscarPersonas(personas: Persona[]): PersonaDto[] {
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

export function buscarPersona(dni: string, personas: Persona[]): Persona | undefined {
    const personaEncontrada = personas.filter((persona) => {
        return persona.dni === dni;
    })[0];
    return personaEncontrada;
}

export function esDatoValido(dato: unknown, tipo: string) {
    return typeof dato === tipo || typeof dato === 'undefined';
}

function esGeneroValido(genero: Genero | undefined) {
    if (genero) {
        return (
            typeof genero === 'string' && (genero === 'Masculino' || genero === 'Femenino' || genero === 'No-Binario')
        );
    } else {
        return esDatoValido(genero, 'string') || false;
    }
}

export function esFechaValida(fecha: Date | undefined) {
    if (fecha) {
        const fechaParseada = Date.parse(fecha!.toString());
        return (isNaN(fechaParseada) && fecha! < new Date()) || fecha === undefined;
    } else {
        return fecha === undefined || false;
    }
}

export function sonDatosValidos(persona: Partial<Persona>) {
    return (
        esDatoValido(persona.nombre, 'string') &&
        esDatoValido(persona.apellido, 'string') &&
        esDatoValido(persona.dni, 'string') &&
        esDatoValido(persona.genero, 'string') &&
        esGeneroValido(persona.genero!) &&
        esDatoValido(persona.fechaDeNacimiento, 'object') &&
        esFechaValida(persona.fechaDeNacimiento!) &&
        esDatoValido(persona.esDonante, 'boolean') &&
        esDatoValido(persona.autos, 'object')
    );
}

export function editarPersona(dni: string, editBody: Partial<Persona>, personas: Persona[]): Persona | undefined {
    const editData = editBody;
    const personaEncontrada = buscarPersona(dni, personas);
    const index = personas.findIndex((persona) => persona.dni === dni);
    if (personaEncontrada) {
        personas[index] = { ...personaEncontrada, ...editData };
        return personas[index];
    }
}

export function borrarPersona(dni: string, personas: Persona[]) {
    const personaEncontrada = buscarPersona(dni, personas);
    const index = personas.findIndex((persona) => persona.dni === dni);
    if (personaEncontrada) {
        personas.splice(index, 1);
        return 'Persona eliminada con exito.';
    }
    return 'No se puede encontrar la persona.';
}
