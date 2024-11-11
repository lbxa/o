// Learn more: https://docs.expo.dev/guides/monorepos/
const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");
const { FileStore } = require("metro-cache");
const { withNativeWind } = require("nativewind/metro");
const { makeMetroConfig } = require("@rnx-kit/metro-config");
const { mergeConfig } = require("metro-config");
const MetroSymlinksResolver = require("@rnx-kit/metro-resolver-symlinks");

const symlinksResolver = MetroSymlinksResolver();

const projectDir = __dirname;
const monorepoRoot = path.resolve(projectDir, "../..");
const defaultConfig = getDefaultConfig(projectDir);

/** @type {import('expo/metro-config').MetroConfig} */
const monorepoConfig = {
  resolver: {
    disableHierarchicalLookup: true,
    nodeModulesPaths: [
      path.resolve(projectDir, "node_modules"),
      path.resolve(monorepoRoot, "node_modules"),
    ],
    /**
     * React Native has very frail symlink support for modern monorepo tools  
     * that rely on symlinks and global caches to dramatically increase the
     * performance of installs e.g. pnpm. The best way around this is using
     * Microsoft's rnx-kit. I've written more extensively about this in the
     * README.
     * 
     * @see https://gist.github.com/Zn4rK/ed60c380e7b672e3089074f51792a2b8
     */
    resolveRequest: (context, moduleName, platform) => {
      try {
        // Symlinks resolver throws when it can't find what we're looking for.
        const res = symlinksResolver(context, moduleName, platform);

        if (res) {
          return res;
        }
      } catch {
        /**
         * If we have an error, we pass it on to the next resolver in the chain,
         * which should be one of expos.
         * @see https://github.com/expo/expo/blob/9c025ce7c10b23546ca889f3905f4a46d65608a4/packages/%40expo/cli/src/start/server/metro/withMetroResolvers.ts#L47
         */
        return context.resolveRequest(context, moduleName, platform);
      }
    },
  },
  /**
   * Add the monorepo paths to the Metro config.
   * This allows Metro to resolve modules from the monorepo.
   *
   * @see https://docs.expo.dev/guides/monorepos/#modify-the-metro-config
   */
  watchFolders: [monorepoRoot],
  /**
   * Move the Metro cache to the `node_modules/.cache/metro` folder.
   * This repository configured Turborepo to use this cache location as well.
   * If you have any environment variables, you can configure Turborepo to invalidate it when needed.
   * @see https://turbo.build/repo/docs/reference/configuration#env
   */
  cacheStores: [
    new FileStore({
      root: path.join(projectDir, "node_modules", ".cache", "metro"),
    })
  ]
};


/** @type {import('expo/metro-config').MetroConfig} */
const svgConfig = {
  resolver: {
    assetExts: defaultConfig.resolver.assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...defaultConfig.resolver.sourceExts, "svg"],
  },
  transformer: {
    // <3 -> https://github.com/kristerkari/react-native-svg-transformer/issues/141
    assetPlugins: ['expo-asset/tools/hashAssetFiles'],
    babelTransformerPath: require.resolve('react-native-svg-transformer/expo'),
  },
};

/**
 * Merging configs do not deeply merge arrays/functions. Keep this in mind to not
 * override important properties. Order matters!
 * 
 * @see https://metrobundler.dev/docs/configuration/#merging-configurations
 */
const finalConfig = makeMetroConfig(mergeConfig(defaultConfig, monorepoConfig, svgConfig));

/**
 * Nativewind config must come last! Internally it uses withCssInterop to 
 * resolve css imports. If this is overridden, Nativewind will not work.
 * 
 * @see https://github.com/nativewind/nativewind/issues/972#issuecomment-2329660147
 *
 * Striking a balance between Nativewind and rnx-kit was tricky
 * 
 * @see https://github.com/nativewind/nativewind/issues/926
 */
module.exports = withNativeWind(finalConfig, {
  input: path.join(projectDir, "src", "global.css"),
  configPath: path.join(projectDir, "tailwind.config.ts"),
  projectRoot: projectDir,
  forceWriteFileSystem: true
}); 