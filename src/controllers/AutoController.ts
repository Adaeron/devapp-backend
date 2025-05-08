import { AutoService } from '../services/AutoService';
import { NextFunction, Request, Response } from 'express';

export const AutoController = {
    //Browse
    getAll: (req: Request, res: Response) => {
        const dniDuenio = req.query.dniDuenio?.toString();
        if (!dniDuenio) {
            const autos = AutoService.buscarAutos();
            res.json(autos);
            return;
        }
        const autos = AutoService.buscarAutos(dniDuenio);
        res.json(autos);
    },

    //Read
    getAutoById: (req: Request, res: Response, next: NextFunction) => {
        const auto = req.context.auto;
        res.status(200).json(auto);
        next();
    },

    //Edit
    editAuto: (req: Request, res: Response, next: NextFunction) => {
        const auto = req.context.auto;
        const autoEditado = AutoService.editarAuto(auto);
        res.status(200).json(autoEditado);
        next();
    },

    //Add
    addAuto: (req: Request, res: Response) => {
        const newAuto = req.context.auto;
        const idNuevoAuto = AutoService.crearAuto(newAuto);
        res.status(201).json(idNuevoAuto);
    },

    //Delete
    deleteAuto: (req: Request, res: Response, next: NextFunction) => {
        const auto = req.context.auto;
        AutoService.eliminarAuto(auto);
        res.status(200).json();
        next();
    }
};
