import { TransientPersonaRepository } from './TransientPersonaRepository';
import { MongoPersonaRepository } from './MongoPersonaRepository';
import { iPersonaRepository } from './iPersonaRepository';
import { Persona } from '../../model/Persona';
import { FirebasePersonaRepository } from './FirebasePersonaRepository';

const personaRepositories: Record<string, iPersonaRepository<Persona>> = {
    transient: TransientPersonaRepository,
    mongo: MongoPersonaRepository,
    firebase: FirebasePersonaRepository
};

export const PersonaRepository = personaRepositories[process.env.REPOSITORY || 'transient'];
