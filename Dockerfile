FROM node:22-alpine AS base
WORKDIR /app

# Dev dependencies
FROM base AS install
RUN mkdir -p /tmp/dev
COPY package.json package-lock.json /tmp/dev/
RUN cd /tmp/dev && npm install

# Runtime dependencies
RUN mkdir -p /tmp/prod
COPY package.json package-lock.json /tmp/prod/
RUN cd /tmp/prod && npm install --omit=dev

# Rebuild the source code only when needed
FROM base AS builder
COPY --from=install /tmp/dev/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV=production
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

RUN npm install --global pm2
RUN pm2 install pm2-logrotate
RUN pm2 update

COPY --from=install /tmp/prod/node_modules ./node_modules
COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/pm2.config.js ./pm2.config.js

USER nextjs
EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"
CMD [ "pm2-runtime", "start", "pm2.config.js" ]
