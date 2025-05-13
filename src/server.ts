// Dependencias
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import process from 'process';
import { routes } from './routes/routes';
import bodyParser from 'body-parser';
import { ErrorHandler } from './middlewares/ErrorHandler';
import { SetupRequestContext } from './middlewares/SetupRequestContext';
import { DbConnectionManager } from './db/DbConnectionManager';

// Creamos nuestra app express
const app = express();
// Leemos el puerto de las variables de entorno, si no está, usamos uno por default
const port = process.env.PORT || 9000;

async function startServer() {
    try {
        await DbConnectionManager.connect();
        // Configuramos los plugins
        // Más adelante intentaremos entender mejor cómo funcionan estos plugins
        app.use(cors());
        app.use(helmet());
        app.use(bodyParser.json());

        //Middleware que setea un context al Request.
        app.use(SetupRequestContext);

        // routes
        app.use('/', routes);

        //Error Handler
        app.use(ErrorHandler);

        // Levantamos el servidor en el puerto que configuramos
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`);
        });
    } catch (error) {
        console.log('Ocurrió un error: ' + error);
        process.exit(1);
    }
}

startServer();
