# Shared Logic

This package contains shared logic that can be imported and used across other projects in the monorepo.

## Usage

Add the TypeScript absolute path to the project that is importing this package

```json
{
  "compilerOptions": {
    "paths": {
      // ...
      "~/*": ["../../packages/shared-logic/src/*"]
    }
  }
}
```

### Next.js

Add this package to the transpile packages list in the Next.js config file.

```js
const nextConfig = {
  transpilePackages: ["@repo/shared-logic"],
};

export default nextConfig;
```

## Shared dependencies

Packages that are shared between the projects such as `@tanstack/react-query` should be installed in this package with the `--save-peer` flag so that they're not included in the build.

```shell
pnpm install @tanstack/react-query -D --save-peer
```
