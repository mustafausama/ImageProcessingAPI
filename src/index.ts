import express from 'express';
import path from 'path';
import routes from './routes';

const app = express();
const port = 3000;
const cacheAge = 3600;

app.use('/api', routes);

app.use(
  express.static(path.resolve('assets/thumb/'), {
    maxAge: cacheAge
  })
);

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});

export default app;
