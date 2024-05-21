import pino from 'pino';
import { Express } from "express";
import expressPinoLogger from 'express-pino-logger';

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
});

export const setupLogger = (app: Express ) => {
  app.use(expressPinoLogger({ logger }));
};

export default logger;