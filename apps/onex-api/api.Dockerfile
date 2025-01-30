FROM node:20-alpine AS base
 
FROM base AS builder
  RUN apk update
  RUN apk add --no-cache libc6-compat
  WORKDIR /app

  RUN yarn global add turbo@latest
  COPY . .
  
  # Generate a partial monorepo with a pruned lockfile for a target workspace.
  RUN turbo prune @o/api --docker
 
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
  RUN pnpm turbo build --filter=@o/api
  # RUN pnpm prune --prod --no-optional
 
FROM base AS runner
  WORKDIR /app
  
  # Never run production as root
  RUN addgroup --system --gid 1001 nodejs
  RUN adduser --system --uid 1001 nestjs 
  USER nestjs 
  
  ENV NODE_ENV=production
  
  COPY --from=installer --chown=nestjs:nodejs /app ./
  WORKDIR /app/apps/onex-api

  HEALTHCHECK CMD curl --fail http://localhost:6969/ || exit 1

  EXPOSE 6969
  
  CMD node dist/main.js