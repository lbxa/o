# Requirements

This is the only file you need to read to understand how to install and run this codebase. Ideally you'd straight away get it from the root readme.

## Corepack

Corepack is a requirement to conveniently work with the latest version of pnpm. Yarn and npm will be far too slow once this codebase starts scaling and they tend to destroy even the best disk space out there. SSD space is precious for web devs.

- Install node@20 using [nvm](https://github.com/nvm-sh/nvm).
- `corepack enable`

## Watchman

Watchman is relied upon for the React Native Expo development server and relay compiler to watch for files changes correctly.

```bash
brew update
brew install watchman
```
