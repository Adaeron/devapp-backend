import { AutoService } from '../services/AutoService';
import { NextFunction, Request, Response } from 'express';

export const AutoController = {
    //Browse
    getAll: async (req: Request, res: Response) => {
        const dniDuenio = req.query.dniDuenio?.toString();
        if (!dniDuenio) {
            const autos = await AutoService.buscarAutos();
            res.json(autos);
            return;
        }
        const autos = await AutoService.buscarAutos(dniDuenio);
        res.json(autos);
    },

    //Read
    getAutoById: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const auto = req.context.auto;
            res.status(200).json(auto);
            next();
        } catch (error) {
            next(error);
        }
    },

    //Edit
    editAuto: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const auto = req.context.auto;
            const autoEditado = await AutoService.editarAuto(auto);
            res.status(200).json(autoEditado);
            next();
        } catch (error) {
            next(error);
        }
    },

    //Add
    addAuto: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const newAuto = req.context.auto;
            const idNuevoAuto = await AutoService.crearAuto(newAuto);
            res.status(201).json(idNuevoAuto);
        } catch (error) {
            next(error);
        }
    },

    //Delete
    deleteAuto: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const auto = req.context.auto;
            await AutoService.eliminarAutoAPersona(auto);
            await AutoService.eliminarAuto(auto);
            res.status(200).json();
            next();
        } catch (error) {
            next(error);
        }
    }
};
