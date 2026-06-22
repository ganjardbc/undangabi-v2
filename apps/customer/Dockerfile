# Build stage
FROM node:24-alpine AS builder

RUN corepack enable && corepack prepare pnpm@9.15.9 --activate

WORKDIR /app

# Copy lockfile and workspace package.json
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/customer/package.json ./apps/customer/
COPY packages/ ./packages/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY apps/customer/ ./apps/customer/

# Accept build arguments
ARG VITE_API_BASE_URL="https://undangabi.ganjardev.biz.id/api/v1"
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

# Build
WORKDIR /app/apps/customer
RUN pnpm build

# Production stage
FROM nginx:alpine AS runner

COPY --from=builder /app/apps/customer/dist /usr/share/nginx/html
COPY infra/nginx/spa-nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
