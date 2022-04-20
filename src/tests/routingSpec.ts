import supertest from 'supertest';
import app from '../index';

const request = supertest(app);
describe('Test images endpoint', () => {
  it('sends 400 error in api/images with no parameters', async () => {
    const res = await request.get('/api/images');
    expect(res.status).toBe(400);
  });
  it('sends 404 error in api/images with wrong filename', async () => {
    const res = await request.get(
      '/api/images?filename=wrong&width=400&height=400'
    );
    expect(res.status).toBe(404);
  });
  it('gets an image successfully', async () => {
    const res = await request.get(
      '/api/images?filename=icelandwaterfall&width=400&height=400'
    );
    expect(res.type).toEqual('image/jpg');
    expect(res.status).toBe(200);
  });
});
