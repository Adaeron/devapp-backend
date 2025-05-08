// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Request } from 'express';

declare global {
    namespace Express {
        interface Request {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            context: Record<string, any>;
        }
    }
}
