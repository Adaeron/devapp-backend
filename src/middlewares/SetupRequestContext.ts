import { NextFunction, Request, Response } from 'express';

export const SetupRequestContext = (req: Request, res: Response, next: NextFunction) => {
    req.context = {};
    next();
};
