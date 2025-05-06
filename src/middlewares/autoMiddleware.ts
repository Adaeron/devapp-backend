import { NextFunction, Request, Response } from 'express';
import { autoRepository } from '../repositories/auto/autoRepository';

export const findAutoHandler = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const autoAEncontrar = autoRepository.getById(id);

    if (!autoAEncontrar) {
        throw new Error('No existe el auto');
    }

    next();
};
