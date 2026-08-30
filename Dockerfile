# -----------------------------------------------------------------------------
# Stage 1: Dependencies Cache
# -----------------------------------------------------------------------------
FROM node:22-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*.json ./
RUN npm ci

# -----------------------------------------------------------------------------
# Stage 2: Application Builder
# -----------------------------------------------------------------------------
FROM node:22-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production
RUN npm run build

# -----------------------------------------------------------------------------
# Stage 3: Minimal Production Runtime
# -----------------------------------------------------------------------------
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

# Install curl for container healthcheck
RUN apk add --no-cache curl

# Use built-in non-root user 'node' for security
USER node

# Copy only the compiled standalone Nitro server
COPY --chown=node:node --from=builder /app/.output ./

EXPOSE 3000

# Healthcheck to verify server is responding
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/ || exit 1

CMD ["node", "server/index.mjs"]

