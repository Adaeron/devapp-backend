import { Persona, UUID, withId } from '../interfaces/Persona';
import { PersonaDto } from '../interfaces/PersonaDto';
import { personaRepository } from '../repository/personaRepository';
import { eliminarAutosDePersona } from './autoService';
import { randomUUID } from 'crypto';

export function buscarPersonas(): PersonaDto[] {
    const personas = personaRepository.getAll();
    return personas.map((persona) => {
        return {
            _id: persona._id,
            nombre: persona.nombre,
            apellido: persona.apellido,
            dni: persona.dni
        };
    });
}

export function buscarPersona(id: UUID): withId<Persona> | undefined {
    const personaEncontrada = personaRepository.getById(id);
    return personaEncontrada;
}

export function findByDni(dni: string): withId<Persona> | undefined {
    const personaEncontrada = personaRepository.getByDni(dni);
    return personaEncontrada;
}

export function editarPersona(persona: withId<Persona>, editData: Partial<Persona>): withId<Persona> | undefined {
    const personaEncontrada = buscarPersona(persona._id);
    if (personaEncontrada) {
        return personaRepository.editPersona(editData, personaEncontrada);
    }
}

export function crearPersona(persona: Persona) {
    const _id = randomUUID();
    const personaConId: withId<Persona> = { ...persona, _id };
    personaRepository.addPersona(personaConId);
}

export function borrarPersona(id: UUID) {
    const personaEncontrada = buscarPersona(id);
    if (personaEncontrada) {
        eliminarAutosDePersona(personaEncontrada);
        personaRepository.deletePersona(id);
        return 'Persona eliminada con exito.';
    }
    return 'No se puede encontrar la persona.';
}
