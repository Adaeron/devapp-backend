import { Persona, UUID, withId } from '../../model/Persona';

export interface iAutoRepository<Auto> {
    getAll(): Promise<withId<Auto>[] | null>;
    getById(id: UUID): Promise<withId<Auto> | null | undefined>;
    editAuto(auto: withId<Auto>): Promise<withId<Auto> | null>;
    addAuto(auto: withId<Auto>): Promise<UUID | void>;
    deleteAuto(id: UUID): Promise<void>;
    deleteFromPersona(persona: withId<Persona>): Promise<void>;
    getByPatente(patente: string): Promise<withId<Auto> | null | undefined | null>;
}
