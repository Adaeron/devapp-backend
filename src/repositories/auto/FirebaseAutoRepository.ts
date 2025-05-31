import {
    collection,
    CollectionReference,
    deleteDoc,
    doc,
    DocumentReference,
    DocumentSnapshot,
    Firestore,
    getDoc,
    getDocs,
    Query,
    query,
    QuerySnapshot,
    setDoc,
    updateDoc,
    where
} from 'firebase/firestore/lite';
import { FirebaseConnectionManager } from '../../db/ConnectionManagers/FirebaseConnectionManager';
import { iAutoRepository } from './iAutoRepository';
import { Auto } from '../../model/Auto';
import { Persona, UUID, withId } from '../../model/Persona';
import { logger } from '../../server';
import { DatabaseConnectionError } from '../../errors/Errors';

const db: Firestore = FirebaseConnectionManager.getDb();
const autosCollection: CollectionReference = collection(db, 'autos');

export const FirebaseAutoRepository: iAutoRepository<Auto> = {
    getAll: async (): Promise<withId<Auto>[]> => {
        try {
            const autosSnapshot: QuerySnapshot = await getDocs(autosCollection);
            const autosList: withId<Auto>[] = autosSnapshot.docs.map((doc) => ({
                _id: doc.id as UUID,
                ...(doc.data() as Auto)
            }));
            return autosList;
        } catch (error) {
            logger.error(error);
            const message = error instanceof Error ? error.message : 'Error desconocido';
            throw new DatabaseConnectionError(message);
        }
    },
    getById: async (id: UUID): Promise<withId<Auto> | null> => {
        try {
            const docRef: DocumentReference = doc(autosCollection, id);
            const autoSnapshot: DocumentSnapshot = await getDoc(docRef);
            if (autoSnapshot.exists()) {
                const auto: withId<Auto> = { _id: autoSnapshot.id, ...(autoSnapshot.data() as Auto) };
                return auto;
            }
            return null;
        } catch (error) {
            logger.error(error);
            const message = error instanceof Error ? error.message : 'Error desconocido';
            throw new DatabaseConnectionError(message);
        }
    },
    editAuto: async (auto: withId<Auto>): Promise<withId<Auto> | null> => {
        const { _id, ...autoWithoutId } = auto;
        const docRef = doc(autosCollection, _id);
        try {
            await updateDoc(docRef, autoWithoutId);
            return auto;
        } catch (error) {
            logger.error(error);
            const message = error instanceof Error ? error.message : 'Error desconocido';
            throw new DatabaseConnectionError(message);
        }
    },
    addAuto: async (auto: withId<Auto>): Promise<UUID | void> => {
        const { _id, ...autoWithoutId } = auto;
        const docRef = doc(autosCollection, _id);
        try {
            await setDoc(docRef, autoWithoutId);
            return auto._id;
        } catch (error) {
            logger.error(error);
            const message = error instanceof Error ? error.message : 'Error desconocido';
            throw new DatabaseConnectionError(message);
        }
    },
    deleteAuto: async (id: UUID): Promise<void> => {
        const docRef = doc(autosCollection, id);
        try {
            await deleteDoc(docRef);
        } catch (error) {
            logger.error(error);
            const message = error instanceof Error ? error.message : 'Error desconocido';
            throw new DatabaseConnectionError(message);
        }
    },
    deleteFromPersona: async (persona: withId<Persona>): Promise<void> => {
        //Hago una query en la collection autos donde duenio es el dni de la persona
        const autosQuery: Query = query(autosCollection, where('duenio', '==', persona.dni));
        try {
            //Hago un getDocs de la query (devuelve un QuerySnapshot)
            const autosSnapshot: QuerySnapshot = await getDocs(autosQuery);
            //Si la QuerySnapshot no está vacía
            if (!autosSnapshot.empty) {
                //Itero cada documento de la QuerySnapshot y borro cada doc.
                for (const doc of autosSnapshot.docs) {
                    await deleteDoc(doc.ref);
                }
            }
        } catch (error) {
            logger.error(error);
            const message = error instanceof Error ? error.message : 'Error desconocido';
            throw new DatabaseConnectionError(message);
        }
    },
    getByPatente: async (patente: string): Promise<withId<Auto> | null> => {
        const patenteQuery: Query = query(autosCollection, where('patente', '==', patente));
        try {
            const queryResult: QuerySnapshot = await getDocs(patenteQuery);
            if (!queryResult.empty) {
                const auto = { _id: queryResult.docs[0].id, ...(queryResult.docs[0].data() as Auto) };
                return auto;
            } else {
                return null;
            }
        } catch (error) {
            logger.error(error);
            const message = error instanceof Error ? error.message : 'Error desconocido';
            throw new DatabaseConnectionError(message);
        }
    }
};
