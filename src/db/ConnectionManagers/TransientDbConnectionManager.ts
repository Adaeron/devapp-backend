import { iDbConnectionManager } from '../iDbConnectionManager';

export const TransientDbConnectionManager: iDbConnectionManager = {
    connect: () => {
        console.log('Se conectó a la base de datos.');
    }
};
