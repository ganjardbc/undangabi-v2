# ============================================
# Build stage
# ============================================
FROM node:24-alpine AS builder

RUN corepack enable && corepack prepare pnpm@9.15.9 --activate

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json ./apps/api/
COPY packages/ ./packages/

# Install all dependencies (including dev for building)
RUN pnpm install --frozen-lockfile

# Copy source code
COPY apps/api/ ./apps/api/

# Generate Prisma Client & build
WORKDIR /app/apps/api
RUN pnpm prisma generate
RUN pnpm build

# ============================================
# Deploy stage
# ============================================
FROM node:24-alpine AS deploy

RUN corepack enable && corepack prepare pnpm@9.15.9 --activate

WORKDIR /app

# Copy lockfiles & workspace
COPY --from=builder /app/package.json /app/pnpm-lock.yaml /app/pnpm-workspace.yaml ./
COPY --from=builder /app/apps/api/package.json ./apps/api/package.json

# Install production dependencies only
RUN pnpm install --frozen-lockfile --prod

# Copy built code
COPY --from=builder /app/apps/api/dist ./apps/api/dist

# Copy Prisma schema
COPY --from=builder /app/apps/api/prisma ./apps/api/prisma

# Install Prisma CLI (same version as @prisma/client) and generate client
WORKDIR /app/apps/api
RUN npx prisma@6.4.0 generate

# ============================================
# Runtime stage
# ============================================
FROM node:24-alpine

RUN corepack enable && corepack prepare pnpm@9.15.9 --activate

WORKDIR /app

COPY --from=deploy /app ./

EXPOSE 3030

WORKDIR /app/apps/api
CMD ["node", "dist/main.js"]
