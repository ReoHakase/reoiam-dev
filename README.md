# reoiam.dev

The source code for my personal website, [reoiam.dev](https://reoiam.dev).

Made with 💙 using:

- **Bun** 🥟 _to develop, test, run, and bundle TypeScript projects._
- **Elysia** 🦊 _as fast and type-safe REST server that works on edge runtimes._
- **Next.js<sup>14</sup>** ▲ _with `app` router._
- **Contentlayer** 📚 for MDX processing with fast HMR, remark and rehype supports.
- **Jotai** 👻 _to manage client-side states._
- **Panda CSS** 🐼 _for styling with amazing semantic token and recipe system._
- **Radix UI** 💻 _to provide accesible UI without hassle._
- ~~**Tanstack Query<sup>v5</sup>** 🚦 _to query and mutate endpoints efficiently._~~
- ~~**React Hook Form** 📋 _to handle form with validation uncontrolledly._~~
- **Storybook** 📕 _to check styles and a11y, and to run visual regression tests._
- **Turborepo** ⚙️ _to manage monorepo with cache pipelines._

> [!WARNING]  
> Still under construction 🚧

### Build

#### Full Build

To build all apps and packages, run the following command:

```sh
bun turbo build
```

### Develop

To develop the main web app built with **Next.js**▲ (`apps/web`) and API server built with **Elysia** 🦊 (`apps/api`), run the following command:

```sh
bun --cwd apps/web dev
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
bun x turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your turborepo:

```
bun x turbo link
```
