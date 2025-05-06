import { Request, Response } from 'express';
import { Persona } from '../model/Persona';
import {
    borrarPersona,
    buscarPersona,
    buscarPersonas,
    crearPersona,
    editarPersona,
    findByDni
} from '../services/personaService';
import { EntityNotFoundError, InvalidDataError } from '../errors/errors';

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
        try {
            const persona = buscarPersona(id);
            res.json(persona);
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                res.status(404).send(error.message);
            }
        }
    },

    // Edit
    editPersona: (req: Request, res: Response) => {
        const personaId = req.params.id;
        const editData: Partial<Persona> = req.body;
        try {
            const personaEditada = editarPersona(personaId, editData);
            res.status(201).send(personaEditada);
        } catch (error) {
            if (error instanceof InvalidDataError) {
                res.status(400).send(error.message);
            }
        }
    },

    // Add
    addPersona: (req: Request, res: Response) => {
        try {
            const newPersonaData = { ...req.body };
            const idNewPersona = crearPersona(newPersonaData);
            res.status(201).json(idNewPersona);
        } catch (error) {
            if (error instanceof InvalidDataError) {
                res.status(400).send(error.message);
            }
        }
    },

    // Delete
    deletePersona: (req: Request, res: Response) => {
        const id = req.params.id;
        try {
            borrarPersona(id);
            res.sendStatus(201);
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                res.status(404).json(error.message);
            }
        }
    }
};
