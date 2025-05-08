import { NextFunction, Request, Response } from 'express';
import { Persona, withId } from '../model/Persona';
import { PersonaService } from '../services/PersonaService';

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
    getPersonaById: (req: Request<{ id: string }, withId<Persona>>, res: Response, next: NextFunction) => {
        const persona = req.context.persona;
        res.status(200).json(persona);
        next();
    },

    // Edit
    editPersona: (req: Request, res: Response, next: NextFunction) => {
        const persona = req.context.persona;
        const personaEditada = PersonaService.editarPersona(persona);
        res.status(200).json(personaEditada);
        next();
    },

    // Add
    addPersona: (req: Request, res: Response, next: NextFunction) => {
        const persona = req.context.persona;
        const idNuevaPersona = PersonaService.crearPersona(persona);
        res.status(200).json(idNuevaPersona);
        next();
    },

    // Delete
    deletePersona: (req: Request, res: Response, next: NextFunction) => {
        const persona = req.context.persona;
        PersonaService.borrarPersona(persona);
        res.sendStatus(200).json();
        next();
    }
};
