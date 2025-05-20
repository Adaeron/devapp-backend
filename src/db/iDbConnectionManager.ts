import { FirebaseApp } from 'firebase/app';
import { Db } from 'mongodb';

export interface iDbConnectionManager {
    connect(): void | Promise<FirebaseApp> | FirebaseApp | Promise<Db>;
}
