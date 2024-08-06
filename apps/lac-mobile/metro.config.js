/* eslint-disable @typescript-eslint/no-var-requires */
// Learn more https://docs.expo.dev/guides/monorepos
const { getDefaultConfig } = require("expo/metro-config");
const { FileStore } = require("metro-cache");
const path = require("path");

// eslint-disable-next-line no-undef
const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "../..");

const config = getDefaultConfig(projectRoot);

// #1 - Watch all files in the monorepo
config.watchFolders = [workspaceRoot];
// #3 - Force resolving nested modules to the folders below
config.resolver.disableHierarchicalLookup = true;
// #2 - Try resolving with project modules first, then workspace modules
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(workspaceRoot, "node_modules"),
];

config.resolver.resolveRequest = (context, moduleName, platform) => {
  // Custom resolver for since the "@repo/native-ui" package is in
  // a folder called 'native-ui'
  if (moduleName.startsWith("@repo/native-ui/")) {
    return {
      type: "sourceFile",
      filePath: path.resolve(
        workspaceRoot,
        `${moduleName.replace(
          "@repo/native-ui/components",
          "packages/native-ui/src/components",
        )}/index.ts`,
      ),
    };
  }

  // Custom resolvers for since the "@repo/shared-logic" package is in
  // a folder called 'shared-logic'
  if (moduleName.startsWith("@repo/shared-logic/apis/")) {
    return {
      type: "sourceFile",
      filePath: path.resolve(
        workspaceRoot,
        `${moduleName.replace(
          "@repo/shared-logic/apis/",
          "packages/shared-logic/src/apis/",
        )}.ts`,
      ),
    };
  } else if (moduleName.startsWith("@repo/shared-logic/zod-schema/")) {
    return {
      type: "sourceFile",
      filePath: path.resolve(
        workspaceRoot,
        `${moduleName.replace(
          "@repo/shared-logic/zod-schema/",
          "packages/shared-logic/src/lib/zod-schema/",
        )}.ts`,
      ),
    };
  } else if (moduleName.startsWith("@repo/shared-logic/lib/")) {
    return {
      type: "sourceFile",
      filePath: path.resolve(
        workspaceRoot,
        `${moduleName.replace(
          "@repo/shared-logic/lib/",
          "packages/shared-logic/src/lib/",
        )}.ts`,
      ),
    };
  }

  // Ensure you call the default resolver.
  return context.resolveRequest(context, moduleName, platform);
};

// Use turborepo to restore the cache when possible
config.cacheStores = [
  new FileStore({
    root: path.join(projectRoot, "node_modules", ".cache", "metro"),
  }),
];

module.exports = config;
