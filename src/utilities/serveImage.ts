import path from 'path';
import sharp from 'sharp';
import fs from 'fs';
const serveImage = async (
  filename: string,
  width: string,
  height: string
): Promise<void> => {
  try {
    if (!fs.existsSync(path.resolve('assets/thumb')))
      fs.mkdirSync(path.resolve('assets/thumb'));
    if (fs.existsSync(path.resolve(`assets/thumb/${filename}.thumb.jpg`))) {
      const cache = await sharp(
        path.resolve(`assets/thumb/${filename}.thumb.jpg`)
      ).metadata();
      if (cache.width === parseInt(width) && cache.height === parseInt(height))
        return;
    }

    const w = parseInt(width);
    const h = parseInt(height);
    if (isNaN(w) || isNaN(h)) throw new Error('Invalid dimensions');
    if (!fs.existsSync(path.resolve(`assets/full/${filename}.jpg`)))
      throw new Error('Cannot read image');

    const transformer = await sharp(
      path.resolve(`assets/full/${filename}.jpg`)
    ).resize(parseInt(width), parseInt(height));
    await transformer.toFile(
      path.resolve(`assets/thumb/${filename}.thumb.jpg`)
    );
  } catch (err) {
    throw new Error((<Error>err).message);
  }
};

export default serveImage;
