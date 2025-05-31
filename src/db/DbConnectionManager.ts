import { FirebaseConnectionManager } from './ConnectionManagers/FirebaseConnectionManager';
import { MongoDbConnectionManager } from './ConnectionManagers/MongoDBConnectionManager';
import { TransientDbConnectionManager } from './ConnectionManagers/TransientDbConnectionManager';
import { iDbConnectionManager } from './iDbConnectionManager';

const dbConnectionManagers: Record<string, iDbConnectionManager> = {
    transient: TransientDbConnectionManager,
    mongo: MongoDbConnectionManager,
    firebase: FirebaseConnectionManager
};

export const DbConnectionManager = dbConnectionManagers[process.env.REPOSITORY || 'transient'];
