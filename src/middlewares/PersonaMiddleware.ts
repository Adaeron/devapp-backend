import { NextFunction, Request, Response } from 'express';
import { PersonaService } from '../services/PersonaService';
import { esPersonaValida } from '../aux/auxiliares';

export const PersonaMiddleware = {
    fetchPersonaHandler: (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        const personaAEncontrar = PersonaService.buscarPersona(id);
        req.context.persona = personaAEncontrar;

        next();
    },
    getEntityFromBodyHandler: (req: Request, res: Response, next: NextFunction) => {
        const persona = req.body;
        req.context.persona = persona;
        next();
    },
    mergeEntityHandler: (req: Request, res: Response, next: NextFunction) => {
        //Guardo los datos de edición del body.
        const editData = req.body;
        //Me guardo la persona que encontré en el Middleware previo
        const persona = req.context.persona;
        const personaEditada = { ...persona, ...editData };
        //Guardo el merge de la persona en el Request con la data del body.
        req.context.persona = personaEditada;
        next();
    },
    verifyEntityHandler: (req: Request, res: Response, next: NextFunction) => {
        //En este punto recibo en el request la persona con los datos actualizados
        const persona = req.context.persona;
        const isValidationSucessful = esPersonaValida(persona);
        if (!isValidationSucessful) {
            throw isValidationSucessful;
        }
        next();
    }
};
