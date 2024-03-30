import { cors } from '@elysiajs/cors';
import { serverTiming } from '@elysiajs/server-timing';
import { swagger } from '@elysiajs/swagger';
import { Elysia, t } from 'elysia';
import { serialize } from 'superjson';
import { log } from './logger';

export const app = new Elysia({
  // Prefixed with `/api` in order to increase portability foreseeing a future integration to Next.js.
  // See: https://elysiajs.com/integrations/nextjs.html
  prefix: '/api',
})
  .use(
    swagger({
      documentation: {
        info: {
          title: 'reoiam.dev API Documentation',
          version: '1.0.0',
        },
      },
    }),
  )
  .use(serverTiming())
  .use(log.into())
  .use(cors())
  .mapResponse(({ response, set }) => {
    const isJson = typeof response === 'object';
    if (!isJson) return;
    const { json, meta } = serialize(response);
    set.headers['Elysia-Superjson-Meta'] = JSON.stringify(meta);
    log.info(json);
    return new Response(JSON.stringify(json));
  })
  .get(
    '/ping',
    (ctx) => ({
      useragent: ctx.headers['user-agent'],
      timestamp: new Date(),
    }),
    {
      response: t.Object(
        {
          useragent: t.Optional(
            t.String({
              examples: [
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
              ],
              description: 'The user agent of the client.',
            }),
          ),
          timestamp: t.Date({
            examples: [new Date()],
            description: 'The timestamp by the server when the request is received.',
          }),
        },
        {
          description: 'The response object containing the user agent and the timestamp of the server.',
        },
      ),
      detail: {
        description: 'Ping the server for a response. It is useful for checking the server status.',
        summary: 'Ping the server',
        tags: ['ping'],
      },
    },
  );

export default app;

export type App = typeof app;
