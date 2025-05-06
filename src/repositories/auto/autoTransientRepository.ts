import { Auto } from '../../model/Auto';
import { Persona, withId } from '../../model/Persona';
import { randomUUID } from 'crypto';

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

export const transientAutoRepository = {
    getAll: (): withId<Auto>[] => {
        return autos;
    },
    getById: (id: string): withId<Auto> | undefined => {
        return autos.find((auto) => auto._id === id);
    },
    editAuto: (editData: Partial<Auto>, autoAEditar: withId<Auto>): withId<Auto> => {
        const index = autos.findIndex((auto) => auto._id === autoAEditar._id);
        autos[index] = { ...autoAEditar, ...editData };
        return autos[index];
    },
    addAuto: (auto: withId<Auto>) => {
        autos.push(auto);
        return auto._id;
    },
    deleteAuto: (id: string) => {
        const index = autos.findIndex((auto) => auto._id === id);
        autos.splice(index, 1);
    },
    deleteFromPersona: (persona: withId<Persona>) => {
        for (let i = autos.length - 1; i >= 0; i--) {
            if (autos[i].duenio === persona.dni) {
                autos.splice(i, 1);
            }
        }
    }
};
