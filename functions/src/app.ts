import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
// import cors from 'cors';
import './utils/response/successResponse';
import { errorHandler } from './middleware/errorHandler';
import routes from './routes';
export const app = express();

const corsOptions = {
  origin: '*',
  credentials: true,
};

app.use(
  urlencoded({
    extended: true,
  }),
);
app.use(json());
app.use(cookieParser());
// app.use(cors(corsOptions));
app.use((req, res, next) => {
  const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use('/', routes);
app.use(errorHandler);
