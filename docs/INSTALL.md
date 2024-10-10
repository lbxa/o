# Requirements

This is the only file you need to read to understand how to install and run this codebase. Ideally you'd straight away get it from the root readme.

## Corepack

Corepack is a requirement to conveniently work with the latest version of pnpm. Yarn and npm will be far too slow once this codebase starts scaling.

- Node 20
- Corepack
- `corepack enable`

## Watchman

Watchman is relied upon for the React Native Expo development server and relay compiler to watch for files changes correctly. [It's know to be unstable at times](https://facebook.github.io/watchman/docs/troubleshooting#reactnative-watcher-took-too-long-to-load), so if the server is not watching for file changes, try restarting the server with the following command:

```bash
watchman shutdown-server
brew update
brew reinstall watchman
```
