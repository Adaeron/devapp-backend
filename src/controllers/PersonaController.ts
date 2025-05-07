import { Request, Response } from 'express';
import { Persona } from '../model/Persona';
import { PersonaService } from '../services/PersonaService';
import { EntityNotFoundError, InvalidDataError } from '../errors/Errors';

export const PersonaController = {
    // Browse
    getAll: (req: Request, res: Response) => {
        let resData;
        const dniPersona = req.query.dni?.toString();
        if (req.query.dni) {
            resData = PersonaService.findByDni(dniPersona!);
        } else {
            resData = PersonaService.buscarPersonas();
        }
        res.json(resData);
    },

    // Read
    getPersonaById: (req: Request, res: Response) => {
        const id = req.params.id;
        try {
            const persona = PersonaService.buscarPersona(id);
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
            const personaEditada = PersonaService.editarPersona(personaId, editData);
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
            const idNewPersona = PersonaService.crearPersona(newPersonaData);
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
            PersonaService.borrarPersona(id);
            res.sendStatus(201);
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                res.status(404).json(error.message);
            }
        }
    }
};
