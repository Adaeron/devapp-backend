// Dependencias
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import process from 'process';
import { Persona } from './interfaces/Persona';
import { Genero } from './interfaces/Genero';
import { Auto } from './interfaces/Auto';
import {
    borrarPersona,
    buscarPersona,
    buscarPersonas,
    editarPersona,
    esDatoValido,
    esFechaValida,
    sonDatosValidos
} from './services/personaService';
import { buscarAutos } from './services/autoService';

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
    let resData = {};
    const dniPersona = req.query.dni?.toString();
    if (req.query.dni) {
        resData = { autos: buscarAutos(dniPersona!, personas) };
    } else {
        resData = { personas: buscarPersonas(personas) };
    }
    res.json(resData);
});

// Read
app.get('/personas/:dni', (req, res) => {
    const dni = req.params.dni;
    let personaEncontrada: Persona | undefined = undefined;
    if (dni) {
        personaEncontrada = buscarPersona(dni, personas);
    }
    if (personaEncontrada === undefined) {
        res.status(404).send(`No existe persona con el DNI: ${dni}`);
    } else {
        res.json(personaEncontrada);
    }
});

// Edit
app.put('/personas/:dni', (req, res) => {
    const personaId = req.params.dni;
    const reqData: Partial<Persona> = req.body;
    const personaEditada = editarPersona(personaId, reqData, personas);
    if (sonDatosValidos(reqData)) {
        res.status(201).send(personaEditada);
    }
    if (!sonDatosValidos(reqData)) {
        res.status(400).send('No se puede editar la persona');
    }
    if (personaEditada === undefined) {
        res.status(404).send(`No existe persona con el DNI: ${personaId}`);
    }
});

// Add
app.post('/personas', (req, res) => {
    const newPersona: Persona = { ...req.body };
    personas.push(newPersona);
    res.status(201).json(newPersona.dni);
});

// Delete
app.delete('/personas/:dni', (req, res) => {
    const personaDni = req.params.dni;
    borrarPersona(personaDni, personas);
});

// Levantamos el servidor en el puerto que configuramos
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
