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
import winston, { format } from 'winston';

// Creamos nuestra app express
const app = express();
// Leemos el puerto de las variables de entorno, si no está, usamos uno por default
const port = process.env.PORT || 9000;

export const logger = winston.createLogger({
    level: 'debug',
    format: format.combine(format.timestamp(), format.json()),
    defaultMeta: { service: 'user-service' },
    transports: [
        //
        // - Write all logs with importance level of `error` or higher to `error.log`
        //   (i.e., error, fatal, but not other levels)
        //
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'debug.log', level: 'debug' }),
        //
        // - Write all logs with importance level of `info` or higher to `combined.log`
        //   (i.e., fatal, error, warn, and info, but not trace)
        //
        new winston.transports.File({ filename: 'combined.log' })
    ]
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
    logger.add(
        new winston.transports.Console({
            format: winston.format.simple()
        })
    );
}

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
            // console.log(`Example app listening on port ${port}`);
            logger.info(`Example app listening on port ${port}`);
        });
    } catch (error) {
        console.log('Ocurrió un error: ' + error);
        process.exit(1);
    }
}

startServer();
