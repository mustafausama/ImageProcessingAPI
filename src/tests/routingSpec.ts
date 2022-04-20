import supertest from 'supertest';
import app from '../index';

const request = supertest(app);
describe('Test images endpoint', () => {
  it('sends 400 error in api/images with no parameters', async () => {
    const res = await request.get('/api/images');
    expect(res.status).toBe(400);
    expect(res.text).toEqual('Invalid or missing parameters');
  });
  it('sends 404 error in api/images with wrong filename', async () => {
    const res = await request.get(
      '/api/images?filename=wrong&width=400&height=400'
    );
    expect(res.status).toBe(404);
    expect(res.text).toEqual('Cannot find the required image');
  });
  it('sends 400 error in api/images with invalid dimensions', async () => {
    let res = await request.get(
      '/api/images?filename=icelandwaterfall&width=400&height=0'
    );
    expect(res.status).toBe(400);
    expect(res.text).toEqual('Invalid height');
    res = await request.get(
      '/api/images?filename=icelandwaterfall&width=-400&height=400'
    );
    expect(res.status).toBe(400);
    expect(res.text).toEqual('Invalid width');
    res = await request.get(
      '/api/images?filename=icelandwaterfall&width=400g&height=400'
    );
    expect(res.status).toBe(400);
    expect(res.text).toEqual('Invalid width');
  });
  it('gets an image successfully', async () => {
    const res = await request.get(
      '/api/images?filename=icelandwaterfall&width=400&height=400'
    );
    expect(res.type).toEqual('image/jpg');
    expect(res.status).toBe(200);
  });
});
