import { NextFunction, Request, Response } from 'express';
import { Persona, withId } from '../model/Persona';
import { PersonaService } from '../services/PersonaService';

export const PersonaController = {
    // Browse
    getAll: async (req: Request, res: Response) => {
        let resData;
        const dniPersona = req.query.dni?.toString();
        if (req.query.dni) {
            resData = await PersonaService.findByDni(dniPersona!);
        } else {
            resData = await PersonaService.buscarPersonas();
        }
        res.json(resData);
    },

    // Read
    getPersonaById: (req: Request<{ id: string }, withId<Persona>>, res: Response, next: NextFunction) => {
        try {
            const persona = req.context.persona;
            res.status(200).json(persona);
            next();
        } catch (error) {
            next(error);
        }
    },

    // Edit
    editPersona: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const persona = req.context.persona;
            const personaEditada = await PersonaService.editarPersona(persona);
            res.status(200).json(personaEditada);
            next();
        } catch (error) {
            next(error);
        }
    },

    // Add
    addPersona: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const persona = req.context.persona;
            const idNuevaPersona = await PersonaService.crearPersona(persona);
            res.status(200).json(idNuevaPersona);
            next();
        } catch (error) {
            next(error);
        }
    },

    // Delete
    deletePersona: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const persona = req.context.persona;
            await PersonaService.borrarPersona(persona);
            res.sendStatus(200).json();
            next();
        } catch (error) {
            next(error);
        }
    }
};
