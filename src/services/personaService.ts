import { esPersonaEditValida, esPersonaValida } from '../aux/auxiliares';
import { EntityNotFoundError, InvalidDataError } from '../errors/errors';
import { Persona, UUID, withId } from '../model/Persona';
import { PersonaDto } from '../model/PersonaDto';
import { personaRepository } from '../repositories/personaRepository';
import { eliminarAutosDePersona } from './autoService';
import { randomUUID } from 'crypto';

export function buscarPersonas(): PersonaDto[] {
    const personas = personaRepository.getAll();
    return personas.map((persona) => toDto(persona));
}

function toDto(persona: withId<Persona>): withId<PersonaDto> {
    return {
        _id: persona._id,
        nombre: persona.nombre,
        apellido: persona.apellido,
        dni: persona.dni
    };
}

export function buscarPersona(id: UUID) {
    const personaEncontrada = personaRepository.getById(id);
    if (!personaEncontrada) {
        throw new EntityNotFoundError();
    }
    return personaEncontrada;
}

export function findByDni(dni: string): withId<Persona> | undefined {
    const personaEncontrada = personaRepository.getByDni(dni);
    return personaEncontrada;
}

export function editarPersona(id: UUID, editData: Partial<Persona>) {
    const personaAEditar = buscarPersona(id);
    if (esPersonaEditValida(editData) && personaAEditar) {
        const personaEditada = personaRepository.editPersona(editData, personaAEditar);
        return personaEditada;
    }
    if (!esPersonaEditValida(editData)) {
        throw new InvalidDataError();
    }
    if (!personaAEditar) {
        throw new EntityNotFoundError();
    }
}

export function crearPersona(persona: Persona) {
    const existe = findByDni(persona.dni);
    if (!existe && esPersonaValida(persona)) {
        const _id = randomUUID();
        const personaConId: withId<Persona> = { ...persona, _id };
        personaRepository.addPersona(personaConId);
        return personaConId._id;
    }
    throw new InvalidDataError();
}

export function borrarPersona(id: UUID) {
    const personaEncontrada = buscarPersona(id);
    if (!personaEncontrada) {
        throw new EntityNotFoundError();
    }
    eliminarAutosDePersona(personaEncontrada);
    personaRepository.deletePersona(id);
}
