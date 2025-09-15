ARG NODE_VERSION=22.19.0
ARG PNPM_VERSION=10.15.1

# Base Stage
FROM node:${NODE_VERSION}-alpine AS base

WORKDIR /usr/src/app


RUN apk update && apk upgrade && \
    apk add --no-cache dumb-init && \
    rm -rf /var/cache/apk/*

RUN --mount=type=cache,target=/root/.npm \
    npm install -g pnpm@${PNPM_VERSION}

# Dependency Stage
FROM base AS deps

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
    --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --prod --frozen-lockfile

# Build Stage
FROM deps AS build

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
    --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

COPY . .


ARG MONGODB_URI_BUILD='mongodb://localhost:27017/dummy'
ENV MONGODB_URI=${MONGODB_URI_BUILD}
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Ensure public directory exists in build stage
RUN mkdir -p /usr/src/app/public

RUN pnpm run build

# Final Stage
FROM base AS final


RUN mkdir -p /usr/src/app && chown -R node:node /usr/src/app

USER node

WORKDIR /usr/src/app


COPY --chown=node:node package.json pnpm-lock.yaml ./


COPY --from=deps --chown=node:node /usr/src/app/node_modules ./node_modules
COPY --from=build --chown=node:node /usr/src/app/.next/ ./.next/
COPY --from=build --chown=node:node /usr/src/app/public/ ./public/


ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000


EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1


ENTRYPOINT ["dumb-init", "--"]
CMD ["pnpm", "start"]