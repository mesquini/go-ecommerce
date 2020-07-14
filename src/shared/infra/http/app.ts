import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import { errors, CelebrateError } from 'celebrate';

import AppError from '@shared/errors/AppError';
import createConnection from '@shared/infra/typeorm';
import routes from './routes';

import '@shared/container';

createConnection();

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(errors());

app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.log(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

export default app;
