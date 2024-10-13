# Monorepo Management

Monorepo's are amazing for scaling large and complex software projects. The caveat is that they must be taken good care of.

## Turbo >> Nx

Nx is a great tool built by a great team, but it gets in the way of the job. Turbo does literally 90% of what Nx does whilst not getting in the way. The remaining 10% Turbo still has to catch up on is also not a big deal since its mostly just developer candy.

Turbo tries very hard to not get in the way of the developer. It's the most minimal monorepo management tool I've used.

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

> Remember to keep `.dockerignore` files at the root of the monorepo context, not in the subdirectory of the package being built.

For an optimised turborepo docker image, see the following example:

```dockerfile
FROM node:20-alpine AS base
 
FROM base AS builder
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

RUN yarn global add turbo@latest
COPY . .
 
# Generate a partial monorepo with a pruned lockfile for a target workspace.
RUN turbo prune <project> --docker
 
FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

RUN yarn global add pnpm@latest 
 
# Copy isolate subworkspace configuration files
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml .
COPY --from=builder /app/out/pnpm-workspace.yaml .

# First install the dependencies (as they change less often)
RUN pnpm install --frozen-lockfile
 
# Build the project
COPY --from=builder /app/out/full/ .
RUN pnpm turbo run build --filter=<project> 
RUN pnpm prune --prod --no-optional
 
FROM base AS runner
WORKDIR /app
 
# Never run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs 
USER nestjs 
 
COPY --from=installer --chown=nestjs:nodejs /app ./
WORKDIR /app/<project>

HEALTHCHECK CMD curl --fail http://localhost:<port>/ || exit 1

EXPOSE <port> 
 
CMD node dist/main.js
```
