import { db } from '../../db/ConnectionManagers/MongoDBConnectionManager';
import { Persona, UUID, withId } from '../../model/Persona';
import { iPersonaRepository } from './iPersonaRepository';

export const MongoPersonaRepository: iPersonaRepository<Persona> = {
    getAll: async (): Promise<withId<Persona>[]> => {
        const result = await db.collection<withId<Persona>>('personas').find().toArray();
        return result;
    },
    getById: (id: string): Promise<withId<Persona>> => {
        new Promise((resolve, reject) => {
            const result = db.collection<withId<Persona>>('personas').findOne({ _id: id });
            if (result != null) {
                resolve(result);
            }
            reject('No funca');
        });
    },
    getByDni: async (dni: string): Promise<withId<Persona> | null> => {
        const result = await db.collection<withId<Persona>>('personas').findOne({ dni: dni });
        return result;
    },
    editPersona: async (personaAEditar: withId<Persona>): Promise<withId<Persona> | null> => {
        const result = await db
            .collection<withId<Persona>>('personas')
            .findOneAndUpdate({ _id: personaAEditar._id }, { $set: personaAEditar }, { returnDocument: 'after' });
        return result;
    },
    savePersona: async (persona: withId<Persona>): Promise<UUID> => {
        const result = await db.collection<withId<Persona>>('personas').insertOne(persona);
        return result.insertedId;
    },
    deletePersona: async (id: UUID): Promise<void> => {
        await db.collection<withId<Persona>>('personas').findOneAndDelete({ _id: id });
    }
};
