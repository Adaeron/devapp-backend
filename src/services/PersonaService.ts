import { EntityNotFoundError, InvalidDataError } from '../errors/Errors';
import { Persona, UUID, withId } from '../model/Persona';
import { PersonaDto } from '../model/PersonaDto';
import { PersonaRepository } from '../repositories/persona/PersonaRepository';
import { AutoService } from './AutoService';
import { randomUUID } from 'crypto';

export const PersonaService = {
    buscarPersonas: async (): Promise<PersonaDto[]> => {
        const personas = await PersonaRepository.getAll();
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
    buscarPersona: async (id: UUID): Promise<withId<Persona>> => {
        const personaEncontrada = await PersonaRepository.getById(id);
        if (!personaEncontrada) {
            throw new EntityNotFoundError();
        }
        return personaEncontrada;
    },
    findByDni: async (dni: string): Promise<withId<Persona> | null | undefined> => {
        const personaEncontrada = await PersonaRepository.getByDni(dni);
        return personaEncontrada;
    },
    editarPersona: async (persona: withId<Persona>) => {
        const personaEditada = await PersonaRepository.editPersona(persona);
        return personaEditada;
    },
    crearPersona: async (persona: Persona): Promise<string | void> => {
        const _id = randomUUID();
        const personaConId = { _id, ...persona };
        const existe = await PersonaService.findByDni(persona.dni);
        if (existe) {
            throw new InvalidDataError(`Ya existe una persona con el DNI: ${persona.dni}`);
        }
        const idInsertado = await PersonaRepository.savePersona(personaConId);
        return idInsertado;
    },
    borrarPersona: async (persona: withId<Persona>) => {
        await AutoService.eliminarAutosDePersona(persona);
        await PersonaRepository.deletePersona(persona._id);
    }
};
