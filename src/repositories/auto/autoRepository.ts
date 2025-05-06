import { mongoAutoRepository } from './mongoAutoRepository';
import { transientAutoRepository } from './autoTransientRepository';

export const autoRepository = process.env.REPOSITORY === 'transient' ? transientAutoRepository : mongoAutoRepository;
