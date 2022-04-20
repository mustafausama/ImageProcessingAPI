import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';

const validationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { filename, width, height } = req.query;
  if (!filename || !width || !height)
    res.status(400).send('Wrong image parameters');
  else if (!fs.existsSync(path.resolve('assets/full/' + filename + '.jpg')))
    res.status(404).send('Cannot find the required image');
  else next();
};

export default validationMiddleware;
