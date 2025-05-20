import { Auto } from '../../model/Auto';
import { Persona, UUID, withId } from '../../model/Persona';
import { randomUUID } from 'crypto';
import { iAutoRepository } from './iAutoRepository';

export const auto1: withId<Auto> = {
    _id: randomUUID(),
    marca: 'Ford',
    modelo: 'Focus',
    color: 'Azul',
    anio: 2020,
    patente: 'AB123CD',
    numeroChasis: 'A123123',
    motor: '234234',
    duenio: '36635028'
};

export const auto2: withId<Auto> = {
    _id: randomUUID(),
    marca: 'Fiat',
    modelo: 'Palio',
    anio: 2005,
    color: 'Negro',
    patente: 'AB234DC',
    numeroChasis: 'C234234',
    motor: '123123',
    duenio: '24498178'
};

const autos = [auto1, auto2];

export const TransientAutoRepository: iAutoRepository<Auto> = {
    getAll: async (): Promise<withId<Auto>[]> => {
        return autos;
    },
    getById: async (id: UUID): Promise<withId<Auto> | undefined> => {
        return autos.find((auto) => auto._id === id);
    },
    editAuto: async (autoEdit: withId<Auto>): Promise<withId<Auto>> => {
        const index = autos.findIndex((auto) => auto._id === autoEdit._id);
        autos[index] = autoEdit;
        return autos[index];
    },
    addAuto: async (auto: withId<Auto>): Promise<UUID> => {
        autos.push(auto);
        return auto._id;
    },
    deleteAuto: async (id: UUID): Promise<void> => {
        const index = autos.findIndex((auto) => auto._id === id);
        autos.splice(index, 1);
    },
    deleteFromPersona: async (persona: withId<Persona>): Promise<void> => {
        for (let i = autos.length - 1; i >= 0; i--) {
            if (autos[i].duenio === persona.dni) {
                autos.splice(i, 1);
            }
        }
    },
    getByPatente: async (patente: string): Promise<withId<Auto> | undefined> => {
        return autos.find((auto) => auto.patente === patente);
    }
};
