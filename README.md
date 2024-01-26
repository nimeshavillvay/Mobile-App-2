# Frontend Monorepo Template

## Package Manager

This repo uses [pnpm](https://pnpm.io/).

## Environment Variables

Create the `.env.local` file at the root.

As a test you can include the following to see how the template works.

```
NEXT_PUBLIC_API_URL="https://jsonplaceholder.typicode.com"
EXPO_USE_METRO_WORKSPACE_ROOT=1
EXPO_PUBLIC_API_URL="https://jsonplaceholder.typicode.com"
```

Any new variables must also be specified in the `globalEnv` field in the `turbo.json` file.

## Project Structure

The repo has two main folders `apps` and `packages`.

- `app` - Contains the main applications, in this case a [Next.js](https://nextjs.org/) and an [Expo](https://expo.dev/) application.
- `packages` - Contains code that is shared among the applications in the `apps` folder. The template contains sharable [ESLint](https://eslint.org/) configs in `eslint-config` and sharable hooks in `sharable-logic`.

## Workarounds for Expo

- Follow the instructions in this [link](https://github.com/byCedric/expo-monorepo-example#pnpm-workarounds) to get Expo working with pnpm and monorepos.
- Check the `resolver.resolveRequest` field in the Metro config to get it to resolve packages properly
