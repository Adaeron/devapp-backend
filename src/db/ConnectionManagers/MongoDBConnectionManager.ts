import { Db, MongoClient } from 'mongodb';

//URI de mongo.
const uri = process.env.DB_URI || 'mongodb://localhost:27017';
//Inizialización de MongoClient.
const dbClient: MongoClient = new MongoClient(uri);

//Base de datos retornada por connect.
export let db: Db;

//Nombre base de datos
const dbName = 'devapp';

export const MongoDbConnectionManager = {
    connect: async (): Promise<Db> => {
        await dbClient.connect();
        console.log('Se conectó a mongo');
        db = dbClient.db(dbName);
        return db;
    },
    getDb: (): Db => {
        if (!db) {
            MongoDbConnectionManager.connect();
        }
        return db;
    }
};
