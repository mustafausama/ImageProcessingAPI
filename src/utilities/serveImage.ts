import path from 'path';
import sharp from 'sharp';

const serveImage = async (
  filename: string,
  width: string,
  height: string
): Promise<void> => {
  try {
    const cache = await sharp(
      path.resolve(`assets/thumb/${filename}.thumb.jpg`)
    ).metadata();
    if (cache.width === parseInt(width) && cache.height === parseInt(height))
      return;
    const transformer = await sharp(
      path.resolve(`assets/full/${filename}.jpg`)
    ).resize(parseInt(width), parseInt(height));
    await transformer.toFile(
      path.resolve(`assets/thumb/${filename}.thumb.jpg`)
    );
  } catch (err) {
    throw new Error('Cannot read image');
  }
};

export default serveImage;
