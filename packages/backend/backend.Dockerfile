FROM node:20-alpine AS base
 
FROM base AS builder
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

RUN yarn global add turbo@2.1.3
COPY . .
 
# Generate a partial monorepo with a pruned lockfile for a target workspace.
RUN turbo prune @o/backend --docker
 
# Add lockfile and package.json's of isolated subworkspace
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
RUN pnpm turbo run build --filter=@o/backend
RUN pnpm prune --prod --no-optional
 
FROM base AS runner
WORKDIR /app
 
# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs 
USER nestjs 
 
COPY --from=installer --chown=nestjs:nodejs /app ./
WORKDIR /app/packages/backend

HEALTHCHECK CMD curl --fail http://localhost:6969/ || exit 1

EXPOSE 6969
 
CMD node dist/main.js