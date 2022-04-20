import path from 'path';
import sharp from 'sharp';
import fs from 'fs';
const serveImage = async (
  filename: string,
  width: string,
  height: string
): Promise<void> => {
  try {
    if (fs.existsSync(path.resolve(`assets/thumb/${filename}.thumb.jpg`))) {
      const cache = await sharp(
        path.resolve(`assets/thumb/${filename}.thumb.jpg`)
      ).metadata();
      if (cache.width === parseInt(width) && cache.height === parseInt(height))
        return;
    }
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
