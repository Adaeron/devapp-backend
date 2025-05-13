import { Db, MongoClient } from 'mongodb';

//URI de mongo.
const uri = process.env.DB_URI || 'mongodb://localhost:27017';
//Inizialización de MongoClient.
const dbClient: MongoClient = new MongoClient(uri);

//Base de datos retornada por connect.
let db: Db;

//Nombre base de datos
const dbName = 'devapp';

export const DbConnectionManager = {
    connect: async (): Promise<Db> => {
        await dbClient.connect();
        console.log('Se conectó a mongo');
        db = dbClient.db(dbName);
        return db;
    },
    getDb: (): Db => {
        if (!db) {
            throw new Error('Se debe conectar a una base de datos primero. Use connect()');
        }
        return db;
    }
};
