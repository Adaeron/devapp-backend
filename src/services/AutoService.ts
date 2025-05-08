import { EntityNotFoundError, InvalidDataError } from '../errors/Errors';
import { Auto } from '../model/Auto';
import { AutoDto } from '../model/AutoDto';
import { Persona, UUID, withId } from '../model/Persona';
import { AutoRepository } from '../repositories/auto/AutoRepository';
import { PersonaRepository } from '../repositories/persona/PersonaRepository';
import { PersonaService } from './PersonaService';
import { randomUUID } from 'crypto';

export const AutoService = {
    toDto: (auto: withId<Auto>): withId<AutoDto> => {
        return {
            _id: auto._id,
            marca: auto.marca,
            modelo: auto.modelo,
            patente: auto.patente,
            duenio: auto.duenio
        };
    },
    buscarAutos: (dni?: string): AutoDto[] => {
        const autos = AutoRepository.getAll();
        if (dni) {
            return autos.filter((auto) => auto.duenio === dni).map((auto) => AutoService.toDto(auto));
        }
        return autos.map((auto) => AutoService.toDto(auto));
    },
    buscarAuto: (idAuto: UUID) => {
        const auto = AutoRepository.getById(idAuto);
        if (!auto) {
            throw new EntityNotFoundError();
        }
        return AutoRepository.getById(idAuto);
    },
    agregarAutoAPersona: (auto: withId<Auto>, persona: withId<Persona>): void => {
        persona.autos.push(auto._id);
    },
    crearAuto: (auto: Auto) => {
        const duenio = PersonaService.findByDni(auto.duenio);
        const _id = randomUUID();
        const autoConId = { ...auto, _id };
        const existeEnElDuenio = AutoService.existeAutoEnDuenio(autoConId._id, duenio!);
        const existePatente = AutoService.existePatente(autoConId);
        if (existeEnElDuenio) {
            throw new InvalidDataError('El auto ya existe en el dueño.');
        }
        if (existePatente) {
            throw new InvalidDataError('Ya existe un auto con esta patente.');
        }
        const autoId = AutoRepository.addAuto(autoConId);
        AutoService.agregarAutoAPersona(autoConId, duenio!);
        return autoId;
    },
    editarAuto: (auto: withId<Auto>): withId<Auto> => {
        const autoEditado = AutoRepository.editAuto(auto);
        return autoEditado;
    },
    eliminarAuto: (auto: withId<Auto>) => {
        AutoRepository.deleteAuto(auto._id);
    },
    eliminarAutosDePersona: (persona: withId<Persona>) => {
        AutoRepository.deleteFromPersona(persona);
    },
    eliminarAutoAPersona: (idAuto: UUID) => {
        const auto = AutoService.buscarAuto(idAuto);
        const personaDuenia = PersonaRepository.getByDni(auto!.duenio);
        if (auto && personaDuenia) {
            const indexAutoEnPersona = personaDuenia?.autos.findIndex((id) => id === auto._id);
            personaDuenia.autos.splice(indexAutoEnPersona!, 1);
            return;
        }
        if (!auto) {
            throw new EntityNotFoundError();
        }
    },
    existeAutoEnDuenio: (idAuto: string, persona: withId<Persona>) => {
        return persona.autos.find((id) => id === idAuto);
    },
    existePatente: (auto: withId<Auto>): withId<Auto> | undefined => {
        return AutoRepository.getByPatente(auto.patente);
    }
};
