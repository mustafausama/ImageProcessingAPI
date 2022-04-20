import serveImage from '../utilities/serveImage';

describe('Image processing function test', () => {
  it('throws an error when passing image that does not exist', async () => {
    await expectAsync(serveImage('wrong', '100', '100')).toBeRejectedWithError(
      'Cannot read image'
    );
  });
});
