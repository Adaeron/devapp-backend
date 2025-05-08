import { NextFunction, Request, Response } from 'express';
import { EntityNotFoundError, InvalidDataError } from '../errors/Errors';

export const ErrorHandler = (error: Error, req: Request, res: Response, next: NextFunction): void => {
    if (error instanceof EntityNotFoundError) {
        res.status(404).send(error.message);
    } else if (error instanceof InvalidDataError) {
        res.status(400).send(error.message);
    } else {
        res.status(500).json({ status: 500, message: error.message });
    }

    next();
};
