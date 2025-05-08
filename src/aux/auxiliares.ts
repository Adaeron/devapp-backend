import { InvalidDataError } from '../errors/Errors';
import { Auto } from '../model/Auto';
import { Genero } from '../model/Genero';
import { Persona } from '../model/Persona';

export function esFechaValida(fecha: string) {
    const fechaParseada = new Date(fecha);
    return !isNaN(fechaParseada.valueOf()) && fechaParseada < new Date();
}

export function esPersonaValida(persona: Persona): boolean {
    if (typeof persona.nombre !== 'string' || persona.nombre.trim() === '') {
        throw new InvalidDataError('El nombre es obligatorio y no puede estar vacío.');
    }

    if (typeof persona.apellido !== 'string' || persona.apellido.trim() === '') {
        throw new InvalidDataError('El apellido es obligatorio y no puede estar vacío.');
    }

    if (typeof persona.dni !== 'string' || !/^\d{7,9}$/.test(persona.dni)) {
        throw new InvalidDataError('El DNI debe ser un string de 7 a 9 dígitos.');
    }

    if (!esFechaValida(persona.fechaDeNacimiento.toString())) {
        throw new InvalidDataError('La fecha de nacimiento debe ser una fecha válida.');
    } else if (persona.fechaDeNacimiento > new Date()) {
        throw new InvalidDataError('La fecha de nacimiento no puede ser en el futuro.');
    }

    if (!Object.values(Genero).includes(persona.genero)) {
        throw new InvalidDataError('El género debe ser uno de los valores permitidos.');
    }

    if (typeof persona.esDonante !== 'boolean') {
        throw new InvalidDataError(`El valor de 'esDonante' debe ser booleano.`);
    }

    if (!Array.isArray(persona.autos)) {
        throw new InvalidDataError(`El campo 'autos' debe ser un arreglo.`);
    }
    return true;
}

export function esAutoValido(auto: Auto) {
    if (typeof auto.marca !== 'string' || auto.marca.trim() === '') {
        throw new InvalidDataError('La marca es obligatorio y no puede estar vacía.');
    }

    if (typeof auto.modelo !== 'string' || auto.modelo.trim() === '') {
        throw new InvalidDataError('El modelo es obligatorio y no puede estar vacío.');
    }

    if (typeof auto.patente !== 'string' || auto.patente.trim() === '') {
        throw new InvalidDataError('La patente es obligatoria y no puede estar vacía.');
    }

    if (typeof auto.anio !== 'number' || auto.anio < 1900) {
        throw new InvalidDataError('El año debe ser mayor a 1900.');
    }

    if (typeof auto.color !== 'string' || auto.color.trim() === '') {
        throw new InvalidDataError('El color es obligatorio y no puede estar vacío.');
    }

    if (typeof auto.motor !== 'string') {
        throw new InvalidDataError(`El número de motor es obligatorio y no puede estar vacío.`);
    }

    if (typeof auto.numeroChasis !== 'string' || auto.numeroChasis.trim() === '') {
        throw new InvalidDataError(`El número de chasis es obligatorio y no puede estar vacío.`);
    }
    return true;
}
