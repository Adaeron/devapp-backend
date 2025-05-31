import { Genero } from '../../model/Genero';
import { Persona, UUID, withId } from '../../model/Persona';
import { auto1, auto2 } from '../auto/TransientAutoRepository';
import { randomUUID } from 'crypto';
import { iPersonaRepository } from './iPersonaRepository';

export const nesa: withId<Persona> = {
    _id: randomUUID(),
    nombre: 'Camila',
    apellido: 'Rojas',
    dni: '24498178',
    genero: Genero.Femenino,
    fechaDeNacimiento: new Date('2003-01-30'),
    esDonante: true,
    autos: [auto2._id!]
};

export const sebastian: withId<Persona> = {
    _id: randomUUID(),
    nombre: 'Sebastián',
    apellido: 'Milanesi',
    dni: '36635028',
    fechaDeNacimiento: new Date('1991-09-30'),
    genero: Genero.Masculino,
    esDonante: false,
    autos: [auto1._id!]
};

export const personas = [sebastian, nesa];

export const TransientPersonaRepository: iPersonaRepository<Persona> = {
    getAll: async (): Promise<withId<Persona>[]> => {
        return personas;
    },

    getById: async (id: UUID): Promise<withId<Persona> | undefined> => {
        return personas.find((persona) => persona._id === id);
    },
    getByDni: async (dni: string): Promise<withId<Persona> | undefined> => {
        return personas.find((persona) => persona.dni === dni);
    },
    editPersona: async (personaAEditar: withId<Persona>): Promise<withId<Persona>> => {
        const index = personas.findIndex((persona) => persona._id === personaAEditar._id);
        personas[index] = personaAEditar;
        return personas[index];
    },
    savePersona: async (persona: withId<Persona>): Promise<void> => {
        personas.push(persona);
    },
    deletePersona: async (id: UUID): Promise<void> => {
        const index = personas.findIndex((persona) => persona._id === id);
        personas.splice(index, 1);
    }
};
