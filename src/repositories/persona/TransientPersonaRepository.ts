import { Genero } from '../../model/Genero';
import { Persona, withId } from '../../model/Persona';
import { auto1, auto2 } from '../auto/TransientAutoRepository';
import { randomUUID } from 'crypto';

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

export const TransientPersonaRepository = {
    getAll: (): withId<Persona>[] => {
        return personas;
    },
    getById: (id: string): withId<Persona> | undefined => {
        return personas.find((persona) => persona._id === id);
    },
    getByDni: (dni: string): withId<Persona> | undefined => {
        return personas.find((persona) => persona.dni === dni);
    },
    editPersona: (personaAEditar: withId<Persona>): withId<Persona> => {
        const index = personas.findIndex((persona) => persona._id === personaAEditar._id);
        personas[index] = personaAEditar;
        return personas[index];
    },
    savePersona: (persona: withId<Persona>) => {
        personas.push(persona);
    },
    deletePersona: (id: string) => {
        const index = personas.findIndex((persona) => persona._id === id);
        personas.splice(index, 1);
    }
};
