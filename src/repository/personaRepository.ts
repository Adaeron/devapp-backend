import { Genero } from '../interfaces/Genero';
import { Persona, withId } from '../interfaces/Persona';
import { auto1, auto2 } from './autoRepository';

export const nesa: withId<Persona> = {
    _id: crypto.randomUUID(),
    nombre: 'Camila',
    apellido: 'Rojas',
    dni: '24498178',
    genero: Genero.Femenino,
    fechaDeNacimiento: new Date('2003-01-30'),
    esDonante: true,
    autos: [auto2._id!]
};

export const sebastian: withId<Persona> = {
    _id: crypto.randomUUID(),
    nombre: 'Sebastián',
    apellido: 'Milanesi',
    dni: '36635028',
    fechaDeNacimiento: new Date('1991-09-30'),
    genero: Genero.Masculino,
    esDonante: false,
    autos: [auto1._id!]
};

export const personas = [sebastian, nesa];

export const personaRepository = {
    getAll: (): withId<Persona>[] => {
        return personas;
    },
    getById: (id: string): withId<Persona> | undefined => {
        return personas.find((persona) => persona._id === id);
    },
    getByDni: (dni: string): withId<Persona> | undefined => {
        return personas.find((persona) => persona.dni === dni);
    },
    editPersona: (editData: Partial<Persona>, personaAEditar: withId<Persona>): withId<Persona> => {
        const index = personas.findIndex((persona) => persona._id === personaAEditar._id);
        personas[index] = { ...personaAEditar, ...editData };
        return personas[index];
    },
    addPersona: (persona: withId<Persona>) => {
        personas.push(persona);
    },
    deletePersona: (id: string) => {
        const index = personas.findIndex((persona) => persona._id === id);
        personas.splice(index, 1);
    }
};
