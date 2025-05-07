import { Router } from 'express';
import { AutoController } from '../controllers/AutoController';

export const AutosRouter = Router();

AutosRouter.get('/autos', AutoController.getAll);
AutosRouter.get('/autos/:id', AutoController.getAutoById);
AutosRouter.post('/autos', AutoController.addAuto);
AutosRouter.put('/autos/:id', AutoController.editAuto);
AutosRouter.delete('/autos/:id', AutoController.deleteAuto);
