import { Router } from 'express';
import { PersonaController } from '../controllers/PersonaController';
import { PersonaMiddleware } from '../middlewares/PersonaMiddleware';

export const PersonasRouter = Router();

//Middlewares

//Seteo fetchPersonaHandler para todas aquellas rutas que requieran buscar una Persona.
PersonasRouter.get('/personas/:id', PersonaMiddleware.fetchPersonaHandler);
PersonasRouter.delete('/personas/:id', PersonaMiddleware.fetchPersonaHandler);
//Set de middleware routers para edición
PersonasRouter.put('/personas/:id', PersonaMiddleware.fetchPersonaHandler);
PersonasRouter.put('/personas/:id', PersonaMiddleware.mergeEntityHandler);
PersonasRouter.put('/personas/:id', PersonaMiddleware.verifyEntityHandler);
//Set de middleware routers para creación
PersonasRouter.post('/personas', PersonaMiddleware.getEntityFromBodyHandler);
PersonasRouter.post('/personas', PersonaMiddleware.verifyEntityHandler);

//Controllers
PersonasRouter.get('/personas', PersonaController.getAll);
PersonasRouter.get('/personas/:id', PersonaController.getPersonaById);
PersonasRouter.post('/personas', PersonaController.addPersona);
PersonasRouter.put('/personas/:id', PersonaController.editPersona);
PersonasRouter.delete('/personas/:id', PersonaController.deletePersona);
