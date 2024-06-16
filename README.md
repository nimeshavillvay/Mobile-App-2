# Wurth Frontend Monorepo

## Package Manager

This repo uses [pnpm](https://pnpm.io/).

## Visual Studio Code extensions

Install all the recommended extensions when opening this repo in VS Code for the 1st time.

## Environment Variables

Create the `.env.local` file at the root. Any new variables must also be specified in the `globalEnv` field in the `turbo.json` file.

## Project Structure

The repo has two main folders `apps` and `packages`.

- `app` - Contains the main applications, like the Web and Mobile applications.
- `packages` - Contains code that is shared among the applications in the `apps` folder, like sharable [ESLint](https://eslint.org/) configs in `eslint-config`.

## Workarounds for Expo

- Follow the instructions in this [link](https://github.com/byCedric/expo-monorepo-example#pnpm-workarounds) to get Expo working with pnpm and monorepos.
- Check the `resolver.resolveRequest` field in the Metro config to get it to resolve packages properly

## GitHub Actions

This repo has GitHub Actions configured to run a Prettier and ESLint checks to run on Pull Requests. It will run these check on all packages by default. To save time, the GitHub Action has [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) configured to skip the checks on packages that don't have any code changes.

To configure the remote cache follow [this guide](https://turbo.build/repo/docs/guides/ci-vendors/github-actions). Ideally the `TURBO_TOKEN` secret should come from the Vercel team owner's account so that we don't need to replace the secret every time members in the Vercel team change.
