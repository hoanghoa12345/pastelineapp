import express, { json, urlencoded } from 'express';
import './utils/response/successResponse';
import { errorHandler } from './middleware/errorHandler';
import routes from './routes';

export const app = express();

app.use(
  urlencoded({
    extended: true,
  }),
);
app.use(json());

app.use('/', routes);
app.use(errorHandler);
