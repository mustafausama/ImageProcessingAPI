import express, { Request, Response } from 'express';
import path from 'path';
import serveImage from '../../utilities/serveImage';
import validationMiddleware from '../../utilities/validation';

const images = express.Router();

images.get(
  '/',
  validationMiddleware,
  async (req: Request, res: Response): Promise<void> => {
    const { filename, width, height } = req.query;
    await serveImage(<string>filename, <string>width, <string>height);
    res
      .type('image/jpg')
      .status(200)
      .sendFile(path.resolve(`assets/thumb/${filename}.thumb.jpg`));
  }
);

export default images;
