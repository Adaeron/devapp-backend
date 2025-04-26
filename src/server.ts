// Dependencias
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import process from 'process';
import { routes } from './routes/routes';
import bodyParser from 'body-parser';

// Creamos nuestra app express
const app = express();
// Leemos el puerto de las variables de entorno, si no está, usamos uno por default
const port = process.env.PORT || 9000;

// Configuramos los plugins
// Más adelante intentaremos entender mejor cómo funcionan estos plugins
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

// routes
app.use('/', routes);

// Levantamos el servidor en el puerto que configuramos
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
