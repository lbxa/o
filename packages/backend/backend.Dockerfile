FROM node:20-alpine AS base
 
FROM base AS builder
  RUN apk update
  RUN apk add --no-cache libc6-compat
  WORKDIR /app

  RUN yarn global add turbo@2.2.3 
  COPY . .
  
  # Generate a partial monorepo with a pruned lockfile for a target workspace.
  RUN turbo prune @o/backend --docker
 
# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
  RUN apk update
  RUN apk add --no-cache libc6-compat
  WORKDIR /app

  # Copy isolate subworkspace configuration files
  COPY --from=builder /app/out/json/ .
  
  # First install the dependencies (as they change less often)
  RUN corepack enable
  RUN pnpm install --frozen-lockfile
  
  # Build the project
  COPY --from=builder /app/out/full/ .
  RUN pnpm turbo build --filter=@o/backend
  # RUN pnpm prune --prod --no-optional
 
FROM base AS runner
  WORKDIR /app
  
  # Never run production as root
  RUN addgroup --system --gid 1001 nodejs
  RUN adduser --system --uid 1001 nestjs 
  USER nestjs 
  
  COPY --from=installer --chown=nestjs:nodejs /app ./
  WORKDIR /app/packages/backend

  HEALTHCHECK CMD curl --fail http://localhost/ || exit 1

  EXPOSE 80
  
  CMD node dist/main.js