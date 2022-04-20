import path from 'path';
import sharp from 'sharp';
import fs from 'fs';
import { isValidNum } from './validation';
const serveImage = async (
  filename: string,
  width: string,
  height: string
): Promise<void> => {
  try {
    // Checking if the resized image already exists
    if (!fs.existsSync(path.resolve('assets/thumb')))
      fs.mkdirSync(path.resolve('assets/thumb'));
    if (fs.existsSync(path.resolve(`assets/thumb/${filename}.thumb.jpg`))) {
      const cache = await sharp(
        path.resolve(`assets/thumb/${filename}.thumb.jpg`)
      ).metadata();
      if (cache.width === parseInt(width) && cache.height === parseInt(height))
        return;
    }

    // Validating the image processing parameters
    if (!isValidNum(<string>width) || !isValidNum(<string>height))
      throw new Error('Invalid dimensions');
    if (!fs.existsSync(path.resolve(`assets/full/${filename}.jpg`)))
      throw new Error('Cannot read image');

    // Processing the image
    const w = parseInt(width);
    const h = parseInt(height);
    const transformer = await sharp(
      path.resolve(`assets/full/${filename}.jpg`)
    ).resize(w, h);

    // Saving the resized image in the chached folder
    await transformer.toFile(
      path.resolve(`assets/thumb/${filename}.thumb.jpg`)
    );
  } catch (err) {
    throw new Error((<Error>err).message);
  }
};

export default serveImage;
