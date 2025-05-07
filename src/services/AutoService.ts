import { esAutoEditValido, esAutoValido } from '../aux/auxiliares';
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
        const persona = PersonaService.findByDni(dni!);
        const autos = Array<withId<Auto>>();
        persona?.autos.forEach((id) => autos.push(AutoRepository.getById(id)!));
        if (persona) {
            return autos?.map((auto) => AutoService.toDto(auto));
        } else {
            return AutoRepository.getAll().map((auto) => AutoService.toDto(auto));
        }
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
        if (esAutoValido(autoConId) && !existeEnElDuenio) {
            const autoId = AutoRepository.addAuto(autoConId);
            AutoService.agregarAutoAPersona(autoConId, duenio!);
            return autoId;
        }
        if (!esAutoValido(autoConId)) {
            throw new InvalidDataError();
        }
    },
    editarAuto: (idAuto: UUID, editData: Partial<Auto>) => {
        const autoAEditar = AutoRepository.getById(idAuto);

        if (autoAEditar && esAutoEditValido(editData)) {
            const autoEditado = AutoRepository.editAuto(editData, autoAEditar);
            return autoEditado;
        }
        if (!esAutoEditValido(editData)) {
            throw new InvalidDataError();
        }
        if (!autoAEditar) {
            throw new EntityNotFoundError();
        }
    },
    eliminarAuto: (idAuto: UUID) => {
        const autoAEliminar = AutoRepository.getById(idAuto);
        if (!autoAEliminar) {
            throw new EntityNotFoundError();
        }
        AutoRepository.deleteAuto(autoAEliminar._id);
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
    }
};
