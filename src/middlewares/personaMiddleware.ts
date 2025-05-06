import { NextFunction, Request, Response } from 'express';
import { personaRepository } from '../repositories/personaRepository';

export const findPersonaHandler = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const personaAEncontrar = personaRepository.getById(id);

    if (!personaAEncontrar) {
        throw new Error('No existe la persona');
    }

    next();
};
