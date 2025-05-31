import { NextFunction, Request, Response } from 'express';
import { AutoService } from '../services/AutoService';
import { esAutoValido } from '../aux/auxiliares';

export const AutoMiddleware = {
    fetchAutoHandler: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const autoAEncontrar = await AutoService.buscarAuto(id);
            req.context.auto = autoAEncontrar;
            next();
        } catch (error) {
            next(error);
        }
    },
    getEntityFromBodyHandler: (req: Request, res: Response, next: NextFunction) => {
        const auto = req.body;
        req.context.auto = auto;
        next();
    },
    mergeEntityHandler: (req: Request, res: Response, next: NextFunction) => {
        //Guardo los datos de edición del body.
        const editData = req.body;
        //Me guardo el auto que encontré en el Middleware previo
        const auto = req.context.auto;
        const autoEditado = { ...auto, ...editData };
        //Guardo el merge del auto en el Request con la data del body.
        req.context.auto = autoEditado;
        next();
    },
    verifyEntityHandler: (req: Request, res: Response, next: NextFunction) => {
        //En este punto recibo en el request el auto con los datos actualizados
        const auto = req.context.auto;
        const isValidationSucessful = esAutoValido(auto);
        if (!isValidationSucessful) {
            throw isValidationSucessful;
        }
        next();
    }
};
