# Dockerfile for Next.js

# -----------------------------
# 1. Base Stage
# -----------------------------
ARG NODE_VERSION=22.19.0
FROM node:${NODE_VERSION}-alpine AS base
WORKDIR /usr/src/app

# Install pnpm globally
ARG PNPM_VERSION=10.15.1
RUN npm install -g pnpm@${PNPM_VERSION}

# -----------------------------
# 2. Dependencies Stage
# -----------------------------
FROM base AS deps
# Copy only package files to install dependencies
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

# -----------------------------
# 3. Build Stage
# -----------------------------
FROM base AS build
WORKDIR /usr/src/app
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .
RUN pnpm build

# -----------------------------
# 4. Production Stage
# -----------------------------
FROM node:${NODE_VERSION}-alpine AS prod
WORKDIR /usr/src/app

# Copy only necessary files
COPY --from=build /usr/src/app/package.json ./
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/.next ./.next
COPY --from=build /usr/src/app/public ./public

# Set environment variables (optional)
ENV NODE_ENV=production
ENV MONGODB_URI=mongodb://dummy:27017

# Expose the default Next.js port
EXPOSE 3000

# Start Next.js
CMD ["pnpm", "start"]
