import { MongoAutoRepository } from './MongoAutoRepository';
import { TransientAutoRepository } from './TransientAutoRepository';

export const AutoRepository = process.env.REPOSITORY === 'transient' ? TransientAutoRepository : MongoAutoRepository;
