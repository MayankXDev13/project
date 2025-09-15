ARG NODE_VERSION=22.19.0
ARG PNPM_VERSION=10.15.1

# Base Stage
FROM node:${NODE_VERSION}-alpine AS base

WORKDIR /usr/src/app

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

ENV MONGODB_URI='mongodb://localhost:27017/dummy'

RUN pnpm run build

# Final Stage
FROM base AS final

ENV NODE_ENV=production

USER node

COPY package.json .
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/.next/ ./.next/

EXPOSE 3000

CMD ["pnpm", "start"]
