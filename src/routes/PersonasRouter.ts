import { Router } from 'express';
import { PersonaController } from '../controllers/PersonaController';

export const PersonasRouter = Router();

PersonasRouter.get('/personas', PersonaController.getAll);
PersonasRouter.get('/personas/:id', PersonaController.getPersonaById);
PersonasRouter.post('/personas', PersonaController.addPersona);
PersonasRouter.put('/personas/:id', PersonaController.editPersona);
PersonasRouter.delete('/personas/:id', PersonaController.deletePersona);
