// When VERCEL_URL is detected: https://${process.env.VERCEL_URL}
// If there's no environment variable VERCEL_URL is set, will always fallback to http://localhost:${process.env.PORT || 3000}.
// Refer: https://beta.nextjs.org/docs/api-reference/metadata#metadatabase
/**
 * Returns the base URL for the application.
 * If the `VERCEL_URL` environment variable is set, it returns the URL with the `VERCEL_URL` as the hostname.
 * Otherwise, it returns the URL with `localhost` as the hostname and the `PORT` environment variable as the port.
 * If the `PORT` environment variable is not set, it defaults to `3000`.
 *
 * @returns The base URL for the application.
 */
export const baseUrl = new URL(
  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : `http://localhost:${process.env.PORT || 3000}`,
);
