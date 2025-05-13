import { DbConnectionManager } from '../../db/DbConnectionManager';
import { Auto } from '../../model/Auto';
import { Persona, UUID, withId } from '../../model/Persona';

export const MongoAutoRepository = {
    getAll: async (): Promise<withId<Auto>[] | null> => {
        const db = DbConnectionManager.getDb();
        const result = await db.collection<withId<Auto>>('autos').find().toArray();
        return result;
    },
    getById: async (id: string): Promise<withId<Auto> | null> => {
        const db = DbConnectionManager.getDb();
        const result = await db.collection<withId<Auto>>('autos').findOne({ _id: id });
        return result;
    },
    editAuto: async (auto: withId<Auto>): Promise<withId<Auto> | null> => {
        const db = DbConnectionManager.getDb();
        const autoEditado = await db
            .collection<withId<Auto>>('autos')
            .findOneAndUpdate({ _id: auto._id }, { $set: auto }, { returnDocument: 'after' });
        return autoEditado;
    },
    addAuto: async (auto: withId<Auto>): Promise<UUID | void> => {
        const db = DbConnectionManager.getDb();
        const autoInsertado = await db.collection<withId<Auto>>('autos').insertOne(auto);
        return autoInsertado.insertedId;
    },
    deleteAuto: async (id: string): Promise<void> => {
        const db = DbConnectionManager.getDb();
        await db.collection<withId<Auto>>('autos').deleteOne({ _id: id });
    },
    deleteFromPersona: async (persona: withId<Persona>): Promise<void> => {
        const db = DbConnectionManager.getDb();
        await db.collection<withId<Auto>>('autos').deleteMany({ duenio: persona.dni });
    },
    getByPatente: async (patente: string): Promise<withId<Auto> | null> => {
        const db = DbConnectionManager.getDb();
        const autoEncontrado = await db.collection<withId<Auto>>('autos').findOne({ patente: patente });
        return autoEncontrado;
    }
};
