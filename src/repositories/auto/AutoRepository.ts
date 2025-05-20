import { Auto } from '../../model/Auto';
import { FirebaseAutoRepository } from './FirebaseAutoRepository';
import { iAutoRepository } from './iAutoRepository';
import { MongoAutoRepository } from './MongoAutoRepository';
import { TransientAutoRepository } from './TransientAutoRepository';

const autoRepositories: Record<string, iAutoRepository<Auto>> = {
    transient: TransientAutoRepository,
    mongo: MongoAutoRepository,
    firebase: FirebaseAutoRepository
};

export const AutoRepository = autoRepositories[process.env.REPOSITORY || 'transient'];
