import { Router } from 'express';
import { autoController } from '../controllers/autoController';

export const autosRouter = Router();

autosRouter.get('/autos', autoController.getAll);
autosRouter.get('/autos/:id', autoController.getAutoById);
autosRouter.post('/autos', autoController.addAuto);
autosRouter.put('/autos/:id', autoController.editAuto);
autosRouter.delete('/autos/:id', autoController.deleteAuto);
