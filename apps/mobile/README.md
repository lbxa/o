# o

Enjoy the luxury of VSCode full graphql intellisense powered by react relay.

## Known Issues

The choice of using pnpm workspaces with react native kind of complicates things: https://github.com/facebook/metro/issues/1047#issuecomment-1657200840

The solution is gentle: https://github.com/expo/expo/issues/18038#issuecomment-1734833421

Hard cache reset (from root):

```bash
watchman watch-del-all
pnpm store prune
pnpm dlx npkill # remove everything
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