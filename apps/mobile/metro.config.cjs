// Learn more: https://docs.expo.dev/guides/monorepos/
const { getDefaultConfig } = require("expo/metro-config");
const { FileStore } = require("metro-cache");
const { withNativeWind } = require("nativewind/metro");
const { makeMetroConfig } = require("@rnx-kit/metro-config");
const MetroSymlinksResolver = require("@rnx-kit/metro-resolver-symlinks");

// !This is my best shot!
const { mergeConfig } = require("metro-config");

const path = require("path");

const symlinksResolver = MetroSymlinksResolver();

// const config = (() => {
//   const defaultConfig = getDefaultConfig(__dirname);
//   const { transformer, resolver } = defaultConfig;

//   const nativeWindConfig = withNativeWind(defaultConfig, {
//     input: "./src/global.css",
//     configPath: "./tailwind.config.ts",
//   });

//   return {
//     ...nativeWindConfig,
//     transformer: {
//       ...nativeWindConfig.transformer,
//       babelTransformerPath: require.resolve("react-native-svg-transformer/expo"),
//     },
//     resolver: {
//       ...nativeWindConfig.resolver,
//       assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
//       sourceExts: [...nativeWindConfig.resolver.sourceExts, "svg"],
//     },
//   };
// })();

/** @type {import('expo/metro-config').MetroConfig} */
// const withSymlinkSupport = (config) => makeMetroConfig({
//   ...config,
//   resolver: {
//     ...config.resolver,
//     resolveRequest: (context, moduleName, platform) => {
//       try {
//         // Symlinks resolver throws when it can't find what we're looking for.
//         const res = symlinksResolver(context, moduleName, platform);

//         if (res) {
//           return res;
//         }
//       } catch {
//         // If we have an error, we pass it on to the next resolver in the chain,
//         // which should be one of expos.
//         // https://github.com/expo/expo/blob/9c025ce7c10b23546ca889f3905f4a46d65608a4/packages/%40expo/cli/src/start/server/metro/withMetroResolvers.ts#L47
//         return context.resolveRequest(context, moduleName, platform);
//       }
//     },
//   },
// });

/// !TEST

// Striking a balance between Nativewind and rnx-kit was tricky
// https://github.com/nativewind/nativewind/issues/926

const projectDir = __dirname;
const monorepoRoot = path.resolve(projectDir, "../..");

/** @type {import('expo/metro-config').MetroConfig} */
const defaultConfig = getDefaultConfig(projectDir);

const nativeWindConfig = withNativeWind(defaultConfig, {
  input: path.join(projectDir, "./src/global.css"),
  configPath: path.join(projectDir, "./tailwind.config.ts")
});

/** @type {import('expo/metro-config').MetroConfig} */
module.exports = makeMetroConfig({
  ...defaultConfig,
  projectRoot: projectDir,
  resolver: {
    ...defaultConfig.resolver,
    ...nativeWindConfig.resolver,
    disableHierarchicalLookup: true,
    assetExts: defaultConfig.resolver.assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...defaultConfig.resolver.sourceExts, "svg"],
    nodeModulesPaths: [
      path.resolve(projectDir, "node_modules"),
      path.resolve(monorepoRoot, "node_modules"),
    ],
    resolveRequest: (context, moduleName, platform) => {
      try {
        // Symlinks resolver throws when it can't find what we're looking for.
        const res = symlinksResolver(context, moduleName, platform);

        if (res) {
          return res;
        }
      } catch {
        // If we have an error, we pass it on to the next resolver in the chain,
        // which should be one of expos.
        // https://github.com/expo/expo/blob/9c025ce7c10b23546ca889f3905f4a46d65608a4/packages/%40expo/cli/src/start/server/metro/withMetroResolvers.ts#L47
        return context.resolveRequest(context, moduleName, platform);
      }
    },
  },
  transformer: {
    ...defaultConfig.transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer/expo"),
    // <3 -> https://github.com/kristerkari/react-native-svg-transformer/issues/141
    assetPlugins: ['expo-asset/tools/hashAssetFiles'],
    ...nativeWindConfig.transformer
  },
  transformerPath: nativeWindConfig.transformerPath,
  watchFolders: [monorepoRoot],
  cacheStores: [
    new FileStore({
      root: path.join(projectDir, "node_modules", ".cache", "metro"),
    }),
  ]
});

/// !TEST

/**
 * Add the monorepo paths to the Metro config.
 * This allows Metro to resolve modules from the monorepo.
 *
 * @see https://docs.expo.dev/guides/monorepos/#modify-the-metro-config
 * @param {import('expo/metro-config').MetroConfig} config
 * @returns {import('expo/metro-config').MetroConfig}
 */
function withMonorepoPaths(config) {
  const projectRoot = __dirname;
  const monorepoRoot = path.resolve(projectRoot, "../..");

  // #1 - Watch all files in the monorepo
  config.watchFolders = [monorepoRoot];

  // #2 - Resolve modules within the project's `node_modules` first, then all monorepo modules
  config.resolver.nodeModulesPaths = [
    path.resolve(projectRoot, "node_modules"),
    path.resolve(monorepoRoot, "node_modules"),
  ];

  // config.resolver.unstable_enableSymlinks = true;

  return config;
}

/**
 * Move the Metro cache to the `node_modules/.cache/metro` folder.
 * This repository configured Turborepo to use this cache location as well.
 * If you have any environment variables, you can configure Turborepo to invalidate it when needed.
 *
 * @see https://turbo.build/repo/docs/reference/configuration#env
 * @param {import('expo/metro-config').MetroConfig} config
 * @returns {import('expo/metro-config').MetroConfig}
 */
function withTurborepoManagedCache(config) {
  config.cacheStores = [
    new FileStore({ root: path.join(__dirname, "node_modules/.cache/metro") }),
  ];
  return config;
}

// module.exports = withTurborepoManagedCache(withMonorepoPaths(withSymlinkSupport(config)));