# o

Enjoy the luxury of VSCode full graphql intellisense power by react relay.

Issues:

The choice of using pnpm workspaces with react native kind of complicates things: https://github.com/facebook/metro/issues/1047#issuecomment-1657200840

The solution is gentle: https://github.com/expo/expo/issues/18038#issuecomment-1734833421

Hard cache reset (from root):

```bash
watchman watch-del-all
pnpm store prune
pnpm dlx npkill # remove everything
```
