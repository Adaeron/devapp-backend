import { Router } from 'express';
import { personaController } from '../controllers/personaController';

export const personasRouter = Router();

personasRouter.get('/personas', personaController.getAll);
personasRouter.get('/personas/:id', personaController.getPersonaById);
personasRouter.post('/personas', personaController.addPersona);
personasRouter.put('/personas/:id', personaController.editPersona);
personasRouter.delete('/personas/:id', personaController.deletePersona);
