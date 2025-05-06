import { Auto } from '../model/Auto';
import { Genero } from '../model/Genero';
import { Persona } from '../model/Persona';

export function esDatoValido(dato: unknown, tipo: string) {
    return typeof dato === tipo;
}

export function esDatoEditValido(dato: unknown, tipo: string) {
    return typeof dato === tipo || typeof dato === 'undefined';
}

export function esGeneroValido(genero: Genero) {
    return (
        esDatoValido(genero, 'string') && (genero === 'Masculino' || genero === 'Femenino' || genero === 'No-Binario')
    );
}

function esGeneroEditValido(genero: Genero | undefined) {
    if (genero) {
        return (
            typeof genero === 'string' && (genero === 'Masculino' || genero === 'Femenino' || genero === 'No-Binario')
        );
    } else {
        return esDatoEditValido(genero, 'string') || false;
    }
}

export function esFechaValida(fecha: string) {
    const fechaParseada = new Date(fecha);
    return !isNaN(fechaParseada.valueOf()) && fechaParseada < new Date();
}

export function esFechaEditValida(fecha: string | undefined) {
    if (fecha) {
        const fechaParseada = new Date(fecha);
        return (!isNaN(fechaParseada.valueOf()) && fechaParseada < new Date()) || fecha === undefined;
    } else {
        return fecha === undefined || false;
    }
}

export function esPersonaValida(persona: Persona) {
    return (
        esDatoValido(persona.nombre, 'string') &&
        esDatoValido(persona.apellido, 'string') &&
        esDatoValido(persona.dni, 'string') &&
        esDatoValido(persona.genero, 'string') &&
        esGeneroValido(persona.genero) &&
        esDatoValido(persona.esDonante, 'boolean') &&
        esDatoValido(persona.autos, 'object') &&
        esFechaValida(persona.fechaDeNacimiento.toString())
    );
}

export function esPersonaEditValida(persona: Partial<Persona>) {
    return (
        esDatoEditValido(persona.nombre, 'string') &&
        esDatoEditValido(persona.apellido, 'string') &&
        esDatoEditValido(persona.dni, 'string') &&
        esGeneroEditValido(persona.genero!) &&
        esDatoEditValido(persona.esDonante, 'boolean') &&
        esDatoEditValido(persona.autos, 'object') &&
        esFechaEditValida(persona.fechaDeNacimiento?.toString())
    );
}

export function esAutoValido(auto: Auto) {
    return (
        esDatoValido(auto.marca, 'string') &&
        esDatoValido(auto.modelo, 'string') &&
        esDatoValido(auto.anio, 'number') &&
        esDatoValido(auto.color, 'string') &&
        esDatoValido(auto.patente, 'string') &&
        esDatoValido(auto.motor, 'string') &&
        esDatoValido(auto.numeroChasis, 'string') &&
        esDatoValido(auto.duenio, 'string')
    );
}

export function esAutoEditValido(auto: Partial<Auto>) {
    return (
        esDatoEditValido(auto.marca, 'string') &&
        esDatoEditValido(auto.modelo, 'string') &&
        esDatoEditValido(auto.anio, 'number') &&
        esDatoEditValido(auto.color, 'string') &&
        esDatoEditValido(auto.patente, 'string') &&
        esDatoEditValido(auto.motor, 'string') &&
        esDatoEditValido(auto.numeroChasis, 'string') &&
        esDatoEditValido(auto.duenio, 'string')
    );
}
