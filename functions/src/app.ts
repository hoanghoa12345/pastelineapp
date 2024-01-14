import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import './utils/response/successResponse';
import { errorHandler } from './middleware/errorHandler';
import routes from './routes';
export const app = express();

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};

app.use(
  urlencoded({
    extended: true,
  }),
);
app.use(json());
app.use(cookieParser());
if(process.env.NODE_ENV !== 'production') {
  app.use(cors(corsOptions));
}

app.use('/', routes);
app.use(errorHandler);
