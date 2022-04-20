import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';

const isValidNum = (val: string): boolean =>
  /^\d+$/.test(val) && parseInt(val) > 0;

const validationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { filename, width, height } = req.query;
  // Parameter existence
  if (!filename || !width || !height)
    res.status(400).send('Invalid or missing parameters');
  // File existence validation
  else if (!fs.existsSync(path.resolve('assets/full/' + filename + '.jpg')))
    res.status(404).send('Cannot find the required image');
  // Correct width validation
  else if (!isValidNum(<string>width)) res.status(400).send('Invalid width');
  // Correct height validation
  else if (!isValidNum(<string>height)) res.status(400).send('Invalid height');
  else next();
};

export { validationMiddleware, isValidNum };
