# Stage 1: Dependencies
FROM node:18-alpine AS deps
WORKDIR /app

# Install pnpm for faster package management
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies with pnpm
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile

# Stage 2: Development
FROM node:18-alpine AS development
WORKDIR /app

# Use pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy node_modules and package files
COPY --from=deps /app/node_modules ./node_modules
COPY package.json pnpm-lock.yaml* ./

# Set development environment
ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1

# Start development server with pnpm
CMD ["pnpm", "dev"]

# Stage 3: Production builder
FROM node:18-alpine AS builder
WORKDIR /app

# Use pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy node_modules and all source files
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build application
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm build

# Stage 4: Production runner
FROM node:18-alpine AS runner
WORKDIR /app

# Use pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Set permissions
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME localhost

CMD ["node", "server.js"]
