import { db } from '../../db/ConnectionManagers/MongoDBConnectionManager';
import { Auto } from '../../model/Auto';
import { Persona, UUID, withId } from '../../model/Persona';
import { iAutoRepository } from './iAutoRepository';

export const MongoAutoRepository: iAutoRepository<Auto> = {
    getAll: async (): Promise<withId<Auto>[] | null> => {
        const result = await db.collection<withId<Auto>>('autos').find().toArray();
        return result;
    },
    getById: async (id: UUID): Promise<withId<Auto> | null> => {
        const result = await db.collection<withId<Auto>>('autos').findOne({ _id: id });
        return result;
    },
    editAuto: async (auto: withId<Auto>): Promise<withId<Auto> | null> => {
        const autoEditado = await db
            .collection<withId<Auto>>('autos')
            .findOneAndUpdate({ _id: auto._id }, { $set: auto }, { returnDocument: 'after' });
        return autoEditado;
    },
    addAuto: async (auto: withId<Auto>): Promise<UUID | void> => {
        const autoInsertado = await db.collection<withId<Auto>>('autos').insertOne(auto);
        return autoInsertado.insertedId;
    },
    deleteAuto: async (id: UUID): Promise<void> => {
        await db.collection<withId<Auto>>('autos').deleteOne({ _id: id });
    },
    deleteFromPersona: async (persona: withId<Persona>): Promise<void> => {
        await db.collection<withId<Auto>>('autos').deleteMany({ duenio: persona.dni });
    },
    getByPatente: async (patente: string): Promise<withId<Auto> | null> => {
        const autoEncontrado = await db.collection<withId<Auto>>('autos').findOne({ patente: patente });
        return autoEncontrado;
    }
};
