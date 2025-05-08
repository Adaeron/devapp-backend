import { EntityNotFoundError, InvalidDataError } from '../errors/Errors';
import { Persona, UUID, withId } from '../model/Persona';
import { PersonaDto } from '../model/PersonaDto';
import { PersonaRepository } from '../repositories/persona/PersonaRepository';
import { AutoService } from './AutoService';
import { randomUUID } from 'crypto';

export const PersonaService = {
    buscarPersonas: (): PersonaDto[] => {
        const personas = PersonaRepository.getAll();
        return personas.map((persona) => PersonaService.toDto(persona));
    },
    toDto: (persona: withId<Persona>): withId<PersonaDto> => {
        return {
            _id: persona._id,
            nombre: persona.nombre,
            apellido: persona.apellido,
            dni: persona.dni
        };
    },
    buscarPersona: (id: UUID): withId<Persona> => {
        const personaEncontrada = PersonaRepository.getById(id);
        if (!personaEncontrada) {
            throw new EntityNotFoundError();
        }
        return personaEncontrada;
    },
    findByDni: (dni: string): withId<Persona> | undefined => {
        const personaEncontrada = PersonaRepository.getByDni(dni);
        return personaEncontrada;
    },
    editarPersona: (persona: withId<Persona>) => {
        const personaEditada = PersonaRepository.editPersona(persona);
        return personaEditada;
    },
    crearPersona: (persona: Persona): string => {
        const _id = randomUUID();
        const personaConId = { _id, ...persona };
        const existe = PersonaService.findByDni(persona.dni);
        if (existe) {
            throw new InvalidDataError(`Ya existe una persona con el DNI: ${persona.dni}`);
        }
        PersonaRepository.savePersona(personaConId);
        return _id;
    },
    borrarPersona: (persona: withId<Persona>) => {
        AutoService.eliminarAutosDePersona(persona);
        PersonaRepository.deletePersona(persona._id);
    }
};
