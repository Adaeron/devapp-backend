import { DbConnectionManager } from '../../db/DbConnectionManager';
import { Persona, UUID, withId } from '../../model/Persona';

export const MongoPersonaRepository = {
    getAll: async (): Promise<withId<Persona>[]> => {
        const db = DbConnectionManager.getDb();
        const result = await db.collection<withId<Persona>>('personas').find().toArray();
        return result;
    },
    getById: async (id: string): Promise<withId<Persona> | null> => {
        const db = DbConnectionManager.getDb();
        const result = await db.collection<withId<Persona>>('personas').findOne({ _id: id });
        return result;
    },
    getByDni: async (dni: string): Promise<withId<Persona> | null> => {
        const db = DbConnectionManager.getDb();
        const result = await db.collection<withId<Persona>>('personas').findOne({ dni: dni });
        return result;
    },
    editPersona: async (personaAEditar: withId<Persona>): Promise<withId<Persona> | null> => {
        const db = DbConnectionManager.getDb();
        const result = await db
            .collection<withId<Persona>>('personas')
            .findOneAndUpdate({ _id: personaAEditar._id }, { $set: personaAEditar }, { returnDocument: 'after' });
        return result;
    },
    savePersona: async (persona: withId<Persona>): Promise<UUID> => {
        const db = DbConnectionManager.getDb();
        const result = await db.collection<withId<Persona>>('personas').insertOne(persona);
        return result.insertedId;
    },
    deletePersona: async (id: UUID): Promise<void> => {
        const db = DbConnectionManager.getDb();
        await db.collection<withId<Persona>>('personas').findOneAndDelete({ _id: id });
    }
};
