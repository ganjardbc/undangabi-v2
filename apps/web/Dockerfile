# Build stage
FROM node:24-alpine AS builder

RUN corepack enable && corepack prepare pnpm@9.15.9 --activate

WORKDIR /app

# Copy lockfile and workspace package.json
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web/package.json ./apps/web/
COPY packages/ ./packages/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY apps/web/ ./apps/web/

# Accept build arguments
ARG VITE_API_BASE_URL="https://undangabi.ganjardev.biz.id/api/v1"
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

# Build
WORKDIR /app/apps/web
# We build as client-only/SPA for MVP deployment to keep it simple, serving from Nginx.
# If they need SSR, we can change to node runner later.
RUN pnpm build

# Production stage
FROM nginx:alpine AS runner

COPY --from=builder /app/apps/web/dist /usr/share/nginx/html
COPY infra/nginx/web-nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
