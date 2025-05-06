import { transientPersonaRepository } from './transientPersonaRepository';
import { mongoPersonaRepository } from './mongoPersonaRepository';

export const personaRepository =
    process.env.REPOSITORY === 'transient' ? transientPersonaRepository : mongoPersonaRepository;
