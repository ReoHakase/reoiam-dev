import { treaty } from '@elysiajs/eden';
import { describe, expect, it } from 'bun:test';
import { deserialize } from 'superjson';
import { app } from '../src';

const apiClient = treaty(app, {
  onResponse: async (response) => {
    const superJsonMeta = response.headers.get('Elysia-Superjson-Meta');
    if (!superJsonMeta) return;
    return deserialize({
      json: await response.json(),
      meta: JSON.parse(superJsonMeta),
    });
  },
});

describe('Ping', () => {
  it('should return the user agent and the timestamp', async () => {
    const USER_AGENT =
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3';
    const response = await apiClient.api.ping.get({
      headers: {
        'user-agent': USER_AGENT,
      },
    });
    expect(response.data?.useragent).toBe(USER_AGENT);
    expect(response.data?.timestamp).toBeInstanceOf(Date);
    expect(response.data?.timestamp.getUTCMilliseconds()).toBeLessThanOrEqual(new Date().getUTCMilliseconds());
  });
});
