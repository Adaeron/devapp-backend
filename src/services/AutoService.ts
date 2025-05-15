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
    buscarAutos: async (dni?: string): Promise<AutoDto[]> => {
        const autos = await AutoRepository.getAll();
        if (dni) {
            return autos!.filter((auto) => auto.duenio === dni).map((auto) => AutoService.toDto(auto));
        }
        return autos!.map((auto) => AutoService.toDto(auto));
    },
    buscarAuto: async (idAuto: UUID): Promise<withId<Auto> | null> => {
        const auto = await AutoRepository.getById(idAuto);
        if (!auto) {
            throw new EntityNotFoundError();
        }
        return auto;
    },
    agregarAutoAPersona: async (auto: withId<Auto>, persona: withId<Persona>): Promise<void> => {
        const personaConNuevoAuto = { ...persona, autos: [...persona.autos, auto._id] };
        await PersonaRepository.editPersona(personaConNuevoAuto);
    },
    crearAuto: async (auto: Auto) => {
        const duenio = await PersonaService.findByDni(auto.duenio);
        const _id = randomUUID();
        const autoConId = { ...auto, _id };
        const existeEnElDuenio = await AutoService.existeAutoEnDuenio(autoConId._id, duenio!);
        const existePatente = await AutoService.existePatente(autoConId);
        if (existeEnElDuenio) {
            throw new InvalidDataError('El auto ya existe en el dueño.');
        }
        if (existePatente) {
            throw new InvalidDataError('Ya existe un auto con esta patente.');
        }
        const autoId = await AutoRepository.addAuto(autoConId);
        await AutoService.agregarAutoAPersona(autoConId, duenio!);
        return autoId;
    },
    editarAuto: async (auto: withId<Auto>): Promise<withId<Auto> | null> => {
        const autoEditado = await AutoRepository.editAuto(auto);
        return autoEditado;
    },
    eliminarAuto: async (auto: withId<Auto>): Promise<void> => {
        await AutoRepository.deleteAuto(auto._id);
    },
    eliminarAutosDePersona: async (persona: withId<Persona>): Promise<void> => {
        await AutoRepository.deleteFromPersona(persona);
    },
    eliminarAutoAPersona: async (auto: withId<Auto>) => {
        const personaDuenia = await PersonaRepository.getByDni(auto.duenio);
        if (auto && personaDuenia) {
            const autosActualizados = personaDuenia.autos.filter((autoId) => autoId !== auto._id);
            const personaActualizada = { ...personaDuenia, autos: autosActualizados };
            await PersonaRepository.editPersona(personaActualizada);
            return;
        }
        if (!auto) {
            throw new EntityNotFoundError();
        }
    },
    existeAutoEnDuenio: async (idAuto: string, persona: withId<Persona>) => {
        return persona.autos.find((id) => id === idAuto);
    },
    existePatente: async (auto: withId<Auto>): Promise<withId<Auto> | null | undefined> => {
        const autoAEncontrar = await AutoRepository.getByPatente(auto.patente);
        return autoAEncontrar;
    }
};
