import { db } from '../../db/ConnectionManagers/MongoDBConnectionManager';
import { DatabaseConnectionError } from '../../errors/Errors';
import { Auto } from '../../model/Auto';
import { Persona, UUID, withId } from '../../model/Persona';
import { iAutoRepository } from './iAutoRepository';

export const MongoAutoRepository: iAutoRepository<Auto> = {
    getAll: async (): Promise<withId<Auto>[] | null> => {
        try {
            const result = await db.collection<withId<Auto>>('autos').find().toArray();
            return result;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido.';
            throw new DatabaseConnectionError(errorMessage);
        }
    },
    getById: async (id: UUID): Promise<withId<Auto> | null> => {
        try {
            const result = await db.collection<withId<Auto>>('autos').findOne({ _id: id });
            return result;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido.';
            throw new DatabaseConnectionError(errorMessage);
        }
    },
    editAuto: async (auto: withId<Auto>): Promise<withId<Auto> | null> => {
        try {
            const autoEditado = await db
                .collection<withId<Auto>>('autos')
                .findOneAndUpdate({ _id: auto._id }, { $set: auto }, { returnDocument: 'after' });
            return autoEditado;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido.';
            throw new DatabaseConnectionError(errorMessage);
        }
    },
    addAuto: async (auto: withId<Auto>): Promise<UUID | void> => {
        try {
            const autoInsertado = await db.collection<withId<Auto>>('autos').insertOne(auto);
            return autoInsertado.insertedId;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido.';
            throw new DatabaseConnectionError(errorMessage);
        }
    },
    deleteAuto: async (id: UUID): Promise<void> => {
        try {
            await db.collection<withId<Auto>>('autos').deleteOne({ _id: id });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido.';
            throw new DatabaseConnectionError(errorMessage);
        }
    },
    deleteFromPersona: async (persona: withId<Persona>): Promise<void> => {
        try {
            await db.collection<withId<Auto>>('autos').deleteMany({ duenio: persona.dni });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido.';
            throw new DatabaseConnectionError(errorMessage);
        }
    },
    getByPatente: async (patente: string): Promise<withId<Auto> | null> => {
        try {
            const autoEncontrado = await db.collection<withId<Auto>>('autos').findOne({ patente: patente });
            return autoEncontrado;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido.';
            throw new DatabaseConnectionError(errorMessage);
        }
    }
};
