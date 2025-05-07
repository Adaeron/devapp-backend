import { NextFunction, Request, Response } from 'express';
import { AutoService } from '../services/AutoService';
import { EntityNotFoundError } from '../errors/Errors';

export const findAutoHandler = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const autoAEncontrar = AutoService.buscarAuto(id);

    if (!autoAEncontrar) {
        throw new EntityNotFoundError();
    }

    next();
};
