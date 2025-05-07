import { esPersonaEditValida, esPersonaValida } from '../aux/auxiliares';
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
    editarPersona: (id: UUID, editData: Partial<Persona>) => {
        const personaAEditar = PersonaRepository.getById(id);
        if (esPersonaEditValida(editData) && personaAEditar) {
            const personaEditada = PersonaRepository.editPersona(editData, personaAEditar);
            return personaEditada;
        }
        if (!esPersonaEditValida(editData)) {
            throw new InvalidDataError();
        }
        if (!personaAEditar) {
            throw new EntityNotFoundError();
        }
    },
    crearPersona: (persona: Persona) => {
        const existe = PersonaService.findByDni(persona.dni);
        if (!existe && esPersonaValida(persona)) {
            const _id = randomUUID();
            const personaConId: withId<Persona> = { ...persona, _id };
            PersonaRepository.addPersona(personaConId);
            return personaConId._id;
        }
        throw new InvalidDataError();
    },
    borrarPersona: (id: UUID) => {
        const personaEncontrada = PersonaRepository.getById(id);
        if (!personaEncontrada) {
            throw new EntityNotFoundError();
        }
        AutoService.eliminarAutosDePersona(personaEncontrada);
        PersonaRepository.deletePersona(id);
    }
};
