import { esAutoEditValido, esAutoValido } from '../aux/auxiliares';
import { EntityNotFoundError, InvalidDataError } from '../errors/errors';
import { Auto } from '../model/Auto';
import { AutoDto } from '../model/AutoDto';
import { Persona, UUID, withId } from '../model/Persona';
import { autoRepository } from '../repositories/auto/autoRepository';
import { personaRepository } from '../repositories/persona/personaRepository';
import { findByDni } from './personaService';
import { randomUUID } from 'crypto';

export function buscarAutos(dni?: string): AutoDto[] {
    const persona = findByDni(dni!);
    const autos = Array<withId<Auto>>();
    persona?.autos.forEach((id) => autos.push(autoRepository.getById(id)!));
    if (persona) {
        return autos?.map((auto) => toDto(auto));
    } else {
        return autoRepository.getAll().map((auto) => toDto(auto));
    }
}

function toDto(auto: withId<Auto>): withId<AutoDto> {
    return {
        _id: auto._id,
        marca: auto.marca,
        modelo: auto.modelo,
        patente: auto.patente,
        duenio: auto.duenio
    };
}

export function buscarAuto(idAuto: UUID) {
    const auto = autoRepository.getById(idAuto);
    if (!auto) {
        throw new EntityNotFoundError();
    }
    return autoRepository.getById(idAuto);
}

export function agregarAutoAPersona(auto: withId<Auto>, persona: withId<Persona>): void {
    persona.autos.push(auto._id);
}

export function crearAuto(auto: Auto) {
    const duenio = findByDni(auto.duenio);
    const _id = randomUUID();
    const autoConId = { ...auto, _id };
    const existeEnElDuenio = existeAutoEnDuenio(autoConId._id, duenio!);
    if (esAutoValido(autoConId) && !existeEnElDuenio) {
        const autoId = autoRepository.addAuto(autoConId);
        agregarAutoAPersona(autoConId, duenio!);
        return autoId;
    }
    if (!esAutoValido(autoConId)) {
        throw new InvalidDataError();
    }
}

export function editarAuto(idAuto: UUID, editData: Partial<Auto>) {
    const autoAEditar = autoRepository.getById(idAuto);

    if (autoAEditar && esAutoEditValido(editData)) {
        const autoEditado = autoRepository.editAuto(editData, autoAEditar);
        return autoEditado;
    }
    if (!esAutoEditValido(editData)) {
        throw new InvalidDataError();
    }
    if (!autoAEditar) {
        throw new EntityNotFoundError();
    }
}

export function eliminarAuto(idAuto: UUID) {
    const autoAEliminar = autoRepository.getById(idAuto);
    if (!autoAEliminar) {
        throw new EntityNotFoundError();
    }
    autoRepository.deleteAuto(autoAEliminar._id);
}

export function eliminarAutosDePersona(persona: withId<Persona>) {
    autoRepository.deleteFromPersona(persona);
}

export function eliminarAutoAPersona(idAuto: UUID) {
    const auto = buscarAuto(idAuto);
    const personaDuenia = personaRepository.getByDni(auto!.duenio);
    if (auto && personaDuenia) {
        const indexAutoEnPersona = personaDuenia?.autos.findIndex((id) => id === auto._id);
        personaDuenia.autos.splice(indexAutoEnPersona!, 1);
        return;
    }
    if (!auto) {
        throw new EntityNotFoundError();
    }
}

export function existeAutoEnDuenio(idAuto: string, persona: withId<Persona>) {
    return persona.autos.find((id) => id === idAuto);
}
