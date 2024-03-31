import { createPinoLogger } from '@bogeychan/elysia-logger';
import { env } from './env';

export const log = createPinoLogger(
  env.NODE_ENV === 'development'
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

log.debug({ env }, 'Environment variables loaded');
