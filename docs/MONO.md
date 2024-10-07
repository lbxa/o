# Monorepo Management

Monorepo's are amazing for scaling large and complex software projects. The caveat is that they must be taken good care of.

## Turbo > Nx

Nx is a great tool built by a great team, but it gets in the way of the job. Turbo does literally 90% of what Nx does whilst not getting in the way. The remaining 10% Turbo still has to catch up on is also not a big deal since its mostly just developer candy.

## Pruning

Most packages are dockerised as self-contained services. They will most of the time depend on numerous other shared packages in the monorepo. We can build a pruned microrepo of a target package and its dependencies with the following command:

```bash
pnpm turbo prune <package> --docker
```

This will create a `pnpm-lock.yaml` file, which can be used to install the dependencies of the target package and its dependencies with the following command:

```bash
pnpm turbo run build --filter=<package>...
```

This will build a docker image for the target package and its dependencies.

> Remember to keep `.dockerignore` files at the root of the monorepo context, not in the subdirectory of the package you are building.
