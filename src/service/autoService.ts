import { Auto } from '../interfaces/Auto';
import { AutoDto } from '../interfaces/AutoDto';
import { Persona, UUID, withId } from '../interfaces/Persona';
import { autoRepository } from '../repository/autoRepository';
import { personaRepository } from '../repository/personaRepository';
import { findByDni } from './personaService';
import { randomUUID } from 'crypto';

export function buscarAutos(dni?: string): AutoDto[] | undefined {
    const persona = findByDni(dni!);
    const autos = Array<withId<Auto>>();
    persona?.autos.forEach((id) => autos.push(autoRepository.getById(id)!));
    if (persona) {
        return autos?.map((auto) => {
            return {
                _id: auto._id,
                marca: auto.marca,
                modelo: auto.modelo,
                patente: auto.patente,
                duenio: auto.duenio
            };
        });
    } else {
        return autoRepository.getAll().map((auto) => {
            return {
                _id: auto._id,
                marca: auto.marca,
                modelo: auto.modelo,
                patente: auto.patente,
                duenio: auto.duenio
            };
        });
    }
}

export function buscarAuto(idAuto: UUID): withId<Auto> | undefined {
    return autoRepository.getById(idAuto);
}

export function agregarAutoAPersona(auto: withId<Auto>, persona: withId<Persona>): void {
    persona.autos.push(auto._id);
}

export function crearAuto(auto: Auto, duenio: withId<Persona>): withId<Auto> {
    const _id = randomUUID();
    const autoConId = { ...auto, _id };
    autoRepository.addAuto(autoConId);
    agregarAutoAPersona(autoConId, duenio!);
    return autoConId;
}

export function editarAuto(editData: Partial<Auto>, auto: withId<Auto>): withId<Auto> | undefined {
    const autoEncontrado = autoRepository.getById(auto._id);
    if (autoEncontrado) {
        return autoRepository.editAuto(editData, autoEncontrado);
    }
}

export function eliminarAuto(auto: withId<Auto>) {
    autoRepository.deleteAuto(auto._id);
}

export function eliminarAutosDePersona(persona: withId<Persona>) {
    autoRepository.deleteFromPersona(persona);
}

export function eliminarAutoAPersona(autoAEliminar: withId<Auto>) {
    const personaDuenia = personaRepository.getByDni(autoAEliminar.duenio);
    const indexAutoEnPersona = personaDuenia?.autos.findIndex((id) => id === autoAEliminar._id);
    if (personaDuenia) {
        personaDuenia.autos.splice(indexAutoEnPersona!, 1);
    }
}

export function existeAutoEnDuenio(idAuto: string, persona: withId<Persona>) {
    return persona.autos.find((id) => id === idAuto);
}
