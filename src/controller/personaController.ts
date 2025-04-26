import { Request, Response } from 'express';
import { Persona, withId } from '../interfaces/Persona';
import {
    borrarPersona,
    buscarPersona,
    buscarPersonas,
    crearPersona,
    editarPersona,
    findByDni
} from '../service/personaService';
import { esPersonaEditValida, esPersonaValida } from '../aux/auxiliares';

export const personaController = {
    // Browse
    getAll: (req: Request, res: Response) => {
        let resData;
        const dniPersona = req.query.dni?.toString();
        if (req.query.dni) {
            resData = findByDni(dniPersona!);
        } else {
            resData = buscarPersonas();
        }
        res.json(resData);
    },

    // Read
    getPersonaById: (req: Request, res: Response) => {
        const id = req.params.id;
        let personaEncontrada: withId<Persona> | undefined = undefined;
        if (id) {
            personaEncontrada = buscarPersona(id);
        }
        if (!personaEncontrada) {
            res.status(404).send(`No existe persona`);
        } else {
            res.json(personaEncontrada);
        }
    },

    // Edit
    editPersona: (req: Request, res: Response) => {
        const personaId = req.params.id;
        const reqData: Partial<Persona> = req.body;
        const personaAEditar = buscarPersona(personaId);
        let personaEditada;
        if (esPersonaEditValida(reqData) && personaAEditar) {
            personaEditada = editarPersona(personaAEditar, reqData);
            res.status(201).send(personaEditada);
        }
        if (!esPersonaEditValida(reqData)) {
            res.status(400).send('No se puede editar la persona');
        }
        if (!personaAEditar) {
            res.status(404).send(`No se puede encontrar la persona`);
        }
    },

    // Add
    addPersona: (req: Request, res: Response) => {
        const existe = findByDni(req.body.dni);
        const newPersonaData = { ...req.body };
        if (!existe && esPersonaValida(newPersonaData)) {
            const newPersona: Persona = { ...req.body };
            crearPersona(newPersona);
            res.status(201).json(newPersona.dni);
        } else {
            res.status(400).send('No se puede crear una persona.');
        }
    },

    // Delete
    deletePersona: (req: Request, res: Response) => {
        const id = req.params.id;
        const personaABorrar = buscarPersona(id);
        if (personaABorrar) {
            borrarPersona(id);
            res.sendStatus(201);
        } else {
            res.status(404).send('No se pudo borrar la persona');
        }
    }
};
