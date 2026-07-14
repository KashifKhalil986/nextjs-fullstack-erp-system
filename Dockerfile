# syntax=docker/dockerfile:1.7

FROM node:24-alpine AS base

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

# Required for many Next.js / Prisma native dependencies on Alpine
RUN apk add --no-cache libc6-compat openssl

FROM base AS deps

COPY package.json package-lock.json ./

# npm does not use --frozen-lockfile. Use npm ci for locked installs.
RUN npm ci

FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build-time secrets only. These are not saved in the final image.
RUN --mount=type=secret,id=DATABASE_URL,required=true \
    --mount=type=secret,id=JWT_SECRET,required=true \
    export DATABASE_URL="$(cat /run/secrets/DATABASE_URL)" && \
    export JWT_SECRET="$(cat /run/secrets/JWT_SECRET)" && \
    npm run build

FROM node:24-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

RUN apk add --no-cache libc6-compat openssl && \
    addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
