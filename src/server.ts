// Dependencias
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import process from 'process';
import { Persona } from './interfaces/Persona';
import { Genero } from './interfaces/Genero';
import { Auto } from './interfaces/Auto';
import { buscarPersonas } from './services/personaService';

const auto1: Auto = {
    marca: 'Ford',
    modelo: 'Focus',
    color: 'Azul',
    anio: 2020,
    patente: 'AB123CD',
    numeroChasis: 'A123123',
    motor: '234234'
};

const auto2: Auto = {
    marca: 'Fiat',
    modelo: 'Palio',
    anio: 2005,
    color: 'Negro',
    patente: 'AB234DC',
    numeroChasis: 'C234234',
    motor: '123123'
};

const marcos: Persona = {
    nombre: 'Marcos',
    apellido: 'Lopez',
    dni: '24498178',
    genero: Genero.Masculino,
    fechaDeNacimiento: new Date('1976-04-10'),
    esDonante: true,
    autos: [auto2]
};

const sebastian: Persona = {
    nombre: 'Sebastián',
    apellido: 'Milanesi',
    dni: '36635028',
    fechaDeNacimiento: new Date('1991-09-30'),
    genero: Genero.Masculino,
    esDonante: false,
    autos: [auto1]
};

const personas = [sebastian, marcos];
// const autos = [auto1, auto2];

// Creamos nuestra app express
const app = express();
// Leemos el puerto de las variables de entorno, si no está, usamos uno por default
const port = process.env.PORT || 9000;

// Configuramos los plugins
// Más adelante intentaremos entender mejor cómo funcionan estos plugins
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

// Endpoints

// Browse
app.get('/', (req, res) => {
    const reqQueryParam = req.query;
    const resData = {
        personas: buscarPersonas(personas)
    };
    res.json(resData);
});

// Read
app.get('/persona', (req, res) => {
    console.log('lalala');
});

// Edit
app.put('/persona', (req, res) => {
    console.log('asd');
});

// Add
app.post('/persona', (req, res) => {
    console.log('sdfsdf');
});

// Delete
app.delete('/persona', (req, res) => {
    console.log('asdasd');
});

// Levantamos el servidor en el puerto que configuramos
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
