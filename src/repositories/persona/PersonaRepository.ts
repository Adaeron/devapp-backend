import { TransientPersonaRepository } from './TransientPersonaRepository';
import { MongoPersonaRepository } from './MongoPersonaRepository';

export const PersonaRepository =
    process.env.REPOSITORY === 'transient' ? TransientPersonaRepository : MongoPersonaRepository;
