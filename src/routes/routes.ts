import { Router } from 'express';
import { AutosRouter } from './AutosRouter';
import { PersonasRouter } from './PersonasRouter';

export const routes = Router();
routes.use(PersonasRouter);
routes.use(AutosRouter);
