import { Router } from 'express';
import { AutoController } from '../controllers/AutoController';
import { AutoMiddleware } from '../middlewares/AutoMiddleware';

export const AutosRouter = Router();

//Seteo fetchAutoMiddleware para todas aquellas rutas que requieran buscar un Auto.
AutosRouter.get('/autos/:id', AutoMiddleware.fetchAutoHandler);
AutosRouter.delete('/autos/:id', AutoMiddleware.fetchAutoHandler);
AutosRouter.put('/autos/:id', AutoMiddleware.fetchAutoHandler);

//Set de middleware routers para edición
AutosRouter.put('/autos/:id', AutoMiddleware.mergeEntityHandler);
AutosRouter.put('/autos/:id', AutoMiddleware.verifyEntityHandler);
//Set de middleware routers para creación
AutosRouter.post('/autos', AutoMiddleware.getEntityFromBodyHandler);
AutosRouter.post('/autos', AutoMiddleware.verifyEntityHandler);

AutosRouter.get('/autos', AutoController.getAll);
AutosRouter.get('/autos/:id', AutoController.getAutoById);
AutosRouter.post('/autos', AutoController.addAuto);
AutosRouter.put('/autos/:id', AutoController.editAuto);
AutosRouter.delete('/autos/:id', AutoController.deleteAuto);
