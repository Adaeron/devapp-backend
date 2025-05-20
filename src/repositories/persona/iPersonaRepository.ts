import { UUID, withId } from '../../model/Persona';

export interface iPersonaRepository<Persona> {
    getAll(): Promise<withId<Persona>[]>;
    getById(id: UUID): Promise<withId<Persona>>;
    getByDni(dni: string): Promise<withId<Persona> | undefined | null>;
    editPersona(personaAEditar: withId<Persona>): Promise<withId<Persona> | undefined | null>;
    savePersona(persona: withId<Persona>): Promise<UUID | void>;
    deletePersona(id: UUID): Promise<void>;
}
