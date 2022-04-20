import express from 'express';
import images from './images/index';

const routes = express.Router();

routes.use('/images', images);

export default routes;
