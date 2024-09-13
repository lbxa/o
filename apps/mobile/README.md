# o

Enjoy the luxury of VSCode full graphql intellisense power by react relay.

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

## Structure

Reducing complexity whilst maximizing scalability and maintainability is the goal. Any nested stack navigators are used for scalability and access to the header.

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
