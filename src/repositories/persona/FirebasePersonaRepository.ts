import {
    collection,
    deleteDoc,
    doc,
    DocumentReference,
    Firestore,
    getDoc,
    getDocs,
    query,
    Query,
    QuerySnapshot,
    setDoc,
    where
} from 'firebase/firestore/lite';
import { FirebaseConnectionManager } from '../../db/ConnectionManagers/FirebaseConnectionManager';
import { iPersonaRepository } from './iPersonaRepository';
import { Persona, UUID, withId } from '../../model/Persona';
import { DatabaseConnectionError } from '../../errors/Errors';
import { logger } from '../../server';

const db: Firestore = FirebaseConnectionManager.getDb();
const personasCollection = collection(db, 'personas');

export const FirebasePersonaRepository: iPersonaRepository<Persona> = {
    getAll: async (): Promise<withId<Persona>[]> => {
        try {
            const personas: QuerySnapshot = await getDocs(personasCollection);
            const personasList = personas.docs.map((doc) => ({
                _id: doc.id as UUID,
                ...(doc.data() as Persona)
            }));
            return personasList;
        } catch (error) {
            console.error(error);
            const message = error instanceof Error ? error.message : 'Error desconocido';
            throw new DatabaseConnectionError(message);
        }
    },
    getById: async (id: UUID): Promise<withId<Persona> | null> => {
        const docRef: DocumentReference = doc(personasCollection, id);
        try {
            const personaSnapshot = await getDoc(docRef);
            if (personaSnapshot.exists()) {
                const persona: withId<Persona> = { _id: personaSnapshot.id, ...(personaSnapshot.data() as Persona) };
                return persona;
            }
            return null;
        } catch (error) {
            logger.error(error);
            const message = error instanceof Error ? error.message : 'Error desconocido';
            throw new DatabaseConnectionError(message);
        }
    },
    getByDni: async (dni: string): Promise<withId<Persona> | null | undefined> => {
        const dniQuery: Query = query(personasCollection, where('dni', '==', dni));
        try {
            const personaQuerySnapshot: QuerySnapshot = await getDocs(dniQuery);
            if (!personaQuerySnapshot.empty) {
                const persona: withId<Persona> = {
                    _id: personaQuerySnapshot.docs[0].id,
                    ...(personaQuerySnapshot.docs[0].data() as Persona)
                };
                return persona;
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    },
    editPersona: async (personaAEditar: withId<Persona>): Promise<withId<Persona> | null | undefined> => {
        const { _id, ...personaWithoutId } = personaAEditar;
        const docRef: DocumentReference = doc(personasCollection, _id);
        try {
            await setDoc(docRef, personaWithoutId);
            return personaAEditar;
        } catch (error) {
            logger.error(error);
            const message = error instanceof Error ? error.message : 'Error desconocido';
            throw new DatabaseConnectionError(message);
        }
    },
    savePersona: async (persona: withId<Persona>): Promise<UUID | void> => {
        const { _id, ...personaWithoutId } = persona;
        const docRef = doc(personasCollection, _id);
        try {
            await setDoc(docRef, personaWithoutId);
            return _id;
        } catch (error) {
            logger.error(error);
            const message = error instanceof Error ? error.message : 'Error desconocido';
            throw new DatabaseConnectionError(message);
        }
    },
    deletePersona: async (id: UUID): Promise<void> => {
        const docRef = doc(personasCollection, id);
        try {
            await deleteDoc(docRef);
        } catch (error) {
            logger.error(error);
            const message = error instanceof Error ? error.message : 'Error desconocido';
            throw new DatabaseConnectionError(message);
        }
    }
};
