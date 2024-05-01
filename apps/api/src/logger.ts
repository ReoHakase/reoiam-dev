import { createPinoLogger } from '@bogeychan/elysia-logger';
import type { StandaloneLoggerOptions } from '@bogeychan/elysia-logger/types';
import { env } from './env';

const devConfig: StandaloneLoggerOptions = {
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
  level: 'debug',
};

export const log = createPinoLogger(env.NODE_ENV === 'development' ? devConfig : {});
