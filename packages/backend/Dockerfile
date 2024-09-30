# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json ./

RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build

# Stage 2: Production
FROM node:18-alpine

WORKDIR /app

COPY package.json ./

RUN npm install -g pnpm
RUN pnpm install --prod --frozen-lockfile

COPY --from=builder /app/dist ./dist

EXPOSE 6969

ENTRYPOINT ["node", "dist/main.js"]
