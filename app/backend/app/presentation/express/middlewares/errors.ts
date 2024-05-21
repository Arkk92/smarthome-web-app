import { Request, Response, NextFunction } from 'express';
import logger from '../docs/logger';


// Definición de la interfaz para el error
interface AppError extends Error {
  status?: number;
}

export const errorMiddleware = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.stack); // Usa `pino` para registrar el error

  const status = err.status || 500;
  const message = err.message || 'Something went wrong!';

  res.status(status).json({
    error: {
      message,
      status,
    },
  });
};