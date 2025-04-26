import {
    buscarAuto,
    buscarAutos,
    crearAuto,
    editarAuto,
    eliminarAuto,
    eliminarAutoAPersona,
    existeAutoEnDuenio
} from '../service/autoService';
import { findByDni } from '../service/personaService';
import { Auto } from '../interfaces/Auto';
import { Request, Response } from 'express';
import { esAutoEditValido, esAutoValido } from '../aux/auxiliares';

export const autoController = {
    //Browse
    getAll: (req: Request, res: Response) => {
        const dniDuenio = req.query.dniDuenio?.toString();
        let autos;
        if (!dniDuenio) {
            autos = buscarAutos();
            res.json(autos);
        } else {
            autos = buscarAutos(dniDuenio);
            res.json(autos);
        }
    },

    //Read
    getAutoById: (req: Request, res: Response) => {
        const idAuto = req.params.id;
        const auto = buscarAuto(idAuto);
        if (auto) {
            res.json(auto);
        } else {
            res.status(404).send('No se pudo encontrar el auto.');
        }
    },

    //Edit
    editAuto: (req: Request, res: Response) => {
        const auto = buscarAuto(req.params.id);
        const autoEditData: Partial<Auto> = req.body;
        if (auto && esAutoEditValido(autoEditData)) {
            const autoEditado = editarAuto(autoEditData, auto);
            res.status(201).send(autoEditado);
        }
        if (!esAutoEditValido(autoEditData)) {
            res.status(400).send('No se puede editar el auto');
        }
        if (!auto) {
            res.status(404).send(`No se encuentra el auto`);
        }
    },

    //Add
    addAuto: (req: Request, res: Response) => {
        const newAuto = { ...req.body };
        const duenio = findByDni(newAuto.duenio);
        const existeEnElDuenio = existeAutoEnDuenio(newAuto.dni, duenio!);
        if (esAutoValido(newAuto) && !existeEnElDuenio) {
            crearAuto(newAuto, duenio!);
            res.status(200).send(newAuto.patente);
        } else {
            res.status(400).send('No se puede crear el auto.');
        }
    },

    //Delete
    deleteAuto: (req: Request, res: Response) => {
        const idAuto = req.params.id;
        const auto = buscarAuto(idAuto);
        if (auto) {
            eliminarAutoAPersona(auto);
            eliminarAuto(auto);
            res.sendStatus(201);
        } else {
            res.status(404).send('No se puede eliminar el auto');
        }
    }
};
