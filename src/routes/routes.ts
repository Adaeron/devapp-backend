import { Router } from 'express';
import { autosRouter } from './autosRouter';
import { personasRouter } from './personasRouter';

export const routes = Router();
routes.use(personasRouter);
routes.use(autosRouter);
