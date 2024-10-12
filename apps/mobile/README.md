# o

Enjoy the luxury of VSCode full graphql intellisense powered by react relay.

## Known Issues

The choice of using pnpm workspaces with react native kind of complicates things: https://github.com/facebook/metro/issues/1047#issuecomment-1657200840

The solution is gentle: https://github.com/expo/expo/issues/18038#issuecomment-1734833421

Hard cache reset (from root) to reset from erroneous state:

```bash
watchman watch-del-all
pnpm store prune
pnpm dlx npkill # remove everything
```

### Brittle Symlinks With pnpm Monorepo

React Native has very poor symlink support for modern monorepo tools that rely on symlinks and
global caches to dramatically increase the performance of installs e.g. pnpm. It can literally
break unexpectedly as explained by [this Github Issue comment](https://github.com/pnpm/pnpm/issues/4286#issuecomment-2233017605).

React Native is a JS runtime that ships with native bindings which rely on autolinking to work. Autolinking requires
only one version of a dependency to be installed per app. So when pnpm manages all the peer dependencies across the monorepo,
it can mess up the native bindings in the apps. This is quite frustrating but its currently being looked by the [community](https://github.com/pnpm/pnpm/issues/4286#issuecomment-2233017605).

This is the list of the packages that can have problematic peer dependencies:

```js
const IGNORED_PACKAGES = [
  '@expo/cli', // package: @react-native-community/cli-server-api, expo-modules-autolinking, expo-router, express, metro-*, webpack, webpack-dev-server
  '@expo/html-elements', // package: react, react-native, react-native-web
  '@expo/image-utils', // package: sharp, sharp-cli
  '@expo/metro-config', // package: @babel/*, babel-preset-expo, hermes-parser, metro, metro-*
  '@expo/metro-runtime', // package: anser, expo, expo-constants, metro-runtime, pretty-format, react, react-dom, react-native-web, react-refresh, stacktrace-parser
  'babel-preset-expo', // package: @babel/*, debug, expo, react-native-reanimated, resolve-from
  'expo-asset', // package: @react-native/assets-registry, expo-updates (types only)
  'expo-av', // package: expo-asset
  'expo-font', // package: expo-asset
  'expo-gl', // package: react-dom, react-native-reanimated
  'expo-image', // package: @react-native/assets-registry
  'expo-modules-core', // package: react, react-native
  'expo-router', // package: @react-navigation/core, @react-navigation/routers, debug, escape-string-regexp, expect, expo-font, fast-deep-equal, nanoid, react, react-dom, react-native, react-native-web
  'expo-sqlite', // package: expo-asset
  'expo-store-review', // package: expo-constants
  'expo-updates', // cli: @expo/plist, debug, getenv - utils: @expo/cli, @expo/metro-config, metro
  'expo-video', // package: @react-native/assets-registry
];
```

## SVGs

Managed with `react-native-svg-transformer`. Docs are nicely written at: https://github.com/kristerkari/react-native-svg-transformer.

```js
import Logo from "./logo.svg";
<Logo width={120} height={40} />
```

Metro config needs to be adjusted for SVGs to be transformed into React Native compatible components along with TypeScript support.

```ts
declare module "*.svg" {
  import type React from "react";
  import type { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}
```

Caveat for customising the color of the SVGs is to make sure there is no `fill` in any of the children of `<svg>` and only `fill="#000000"` in the root `<svg>` tag. [This comment was the saviour.](https://github.com/kristerkari/react-native-svg-transformer/issues/105#issuecomment-775891947)

## Structure

Reducing complexity whilst maximizing scalability and maintainability is the goal. Any nested stack navigators are used for scalability and access to a shared header.

```plaintext
Root Stack Navigator
├── Auth Stack
│   ├── Login Screen
│   └── Sign Up Screen
└── App Stack
    └── Tab Navigator
        ├── Home Tab (Stack Navigator)
        │   ├── Home Screen
        └── Profile Tab (Stack Navigator)
            └── Profile Screen
```

Each primary screen view will have its parent screen query, which will pass down fragments to its children. Pulling to refresh should iron out the missing data in these screens.