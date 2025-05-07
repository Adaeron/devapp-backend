import { NextFunction, Request, Response } from 'express';
import { PersonaRepository } from '../repositories/persona/PersonaRepository';

export const findPersonaHandler = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const personaAEncontrar = PersonaRepository.getById(id);

    if (!personaAEncontrar) {
        throw new Error('No existe la persona');
    }

    next();
};
