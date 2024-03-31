import { createPinoLogger } from '@bogeychan/elysia-logger';

export const log = createPinoLogger(
  process.env.NODE_ENV === 'development'
    ? {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
          },
        },
        level: 'debug',
      }
    : {},
);
