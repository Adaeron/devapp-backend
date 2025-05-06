import {
    buscarAuto,
    buscarAutos,
    crearAuto,
    editarAuto,
    eliminarAuto,
    eliminarAutoAPersona
} from '../services/autoService';
import { Auto } from '../model/Auto';
import { Request, Response } from 'express';
import { EntityNotFoundError, InvalidDataError } from '../errors/errors';

export const autoController = {
    //Browse
    getAll: (req: Request, res: Response) => {
        const dniDuenio = req.query.dniDuenio?.toString();
        if (!dniDuenio) {
            const autos = buscarAutos();
            res.json(autos);
            return;
        }
        const autos = buscarAutos(dniDuenio);
        res.json(autos);
    },

    //Read
    getAutoById: (req: Request, res: Response) => {
        const idAuto = req.params.id;
        try {
            const auto = buscarAuto(idAuto);
            res.json(auto);
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                res.status(404).send(error.message);
            }
        }
    },

    //Edit
    editAuto: (req: Request, res: Response) => {
        const autoId = req.params.id;
        const autoEditData: Partial<Auto> = req.body;
        try {
            const autoEditado = editarAuto(autoId, autoEditData);
            res.status(201).json(autoEditado);
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                res.status(404).send(error.message);
            }
            if (error instanceof InvalidDataError) {
                res.status(400).send(error.message);
            }
        }
    },

    //Add
    addAuto: (req: Request, res: Response) => {
        const newAuto = { ...req.body };
        try {
            const nuevoAutoId = crearAuto(newAuto);
            res.status(201).json(nuevoAutoId);
        } catch (error) {
            if (error instanceof InvalidDataError) {
                res.status(400).send(error.message);
            }
        }
    },

    //Delete
    deleteAuto: (req: Request, res: Response) => {
        const idAuto = req.params.id;
        try {
            eliminarAutoAPersona(idAuto);
            eliminarAuto(idAuto);
            res.sendStatus(201);
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                res.status(404).send(error.message);
            }
        }
    }
};
