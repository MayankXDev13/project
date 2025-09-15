# -----------------------------
# 1. Base Stage
# -----------------------------
ARG NODE_VERSION=22.19.0
FROM node:${NODE_VERSION}-alpine AS base
WORKDIR /usr/src/app


ARG PNPM_VERSION=10.15.1
RUN npm install -g pnpm@${PNPM_VERSION}

# -----------------------------
# 2. Dependencies Stage
# -----------------------------
FROM base AS deps
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

# -----------------------------
# 3. Build Stage
# -----------------------------

FROM base AS build
WORKDIR /usr/src/app

COPY --from=deps /usr/src/app/node_modules ./node_modules

COPY . .


COPY .env.local .env.local

RUN pnpm build

# -----------------------------
# 4. Production Stage
# -----------------------------

FROM node:${NODE_VERSION}-alpine AS prod
WORKDIR /usr/src/app
RUN npm install -g pnpm@10.15.1


COPY --from=build /usr/src/app/package.json ./
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/.next ./.next
COPY --from=build /usr/src/app/public ./public


EXPOSE 3000

CMD ["pnpm", "start"]
