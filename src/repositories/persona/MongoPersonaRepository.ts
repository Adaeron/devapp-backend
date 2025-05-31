import { db } from '../../db/ConnectionManagers/MongoDBConnectionManager';
import { DatabaseConnectionError, EntityNotFoundError } from '../../errors/Errors';
import { Persona, UUID, withId } from '../../model/Persona';
import { iPersonaRepository } from './iPersonaRepository';

export const MongoPersonaRepository: iPersonaRepository<Persona> = {
    getAll: async (): Promise<withId<Persona>[]> => {
        const result = await db.collection<withId<Persona>>('personas').find().toArray();
        return result;
    },
    getById: (id: string): Promise<withId<Persona>> => {
        return new Promise((resolve, reject) => {
            const result = db.collection<withId<Persona>>('personas').findOne({ _id: id });
            result
                .then((value) => {
                    if (value !== null) {
                        resolve(value);
                    }
                    reject(new EntityNotFoundError());
                })
                .catch((error) => {
                    const errorMessage = error instanceof Error ? error.message : '';
                    reject(new DatabaseConnectionError(errorMessage));
                });
        });
    },
    getByDni: (dni: string): Promise<withId<Persona> | null> => {
        try {
            const result = db.collection<withId<Persona>>('personas').findOne({ dni: dni });
            return result;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido.';
            throw new DatabaseConnectionError(errorMessage);
        }
    },
    editPersona: async (personaAEditar: withId<Persona>): Promise<withId<Persona> | null> => {
        try {
            const result = await db
                .collection<withId<Persona>>('personas')
                .findOneAndUpdate({ _id: personaAEditar._id }, { $set: personaAEditar }, { returnDocument: 'after' });
            return result;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido.';
            throw new DatabaseConnectionError(errorMessage);
        }
    },
    savePersona: async (persona: withId<Persona>): Promise<UUID> => {
        try {
            const result = await db.collection<withId<Persona>>('personas').insertOne(persona);
            return result.insertedId;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido.';
            throw new DatabaseConnectionError(errorMessage);
        }
    },
    deletePersona: async (id: UUID): Promise<void> => {
        try {
            await db.collection<withId<Persona>>('personas').findOneAndDelete({ _id: id });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido.';
            throw new DatabaseConnectionError(errorMessage);
        }
    }
};
