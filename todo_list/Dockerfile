# Build-time arguments
ARG NODE_VERSION=22.19.0
ARG PNPM_VERSION=10.15.1

# ------------------------
# Base image
# ------------------------
FROM node:${NODE_VERSION}-alpine AS base

WORKDIR /usr/src/app

# Install pnpm globally
RUN npm install -g pnpm@${PNPM_VERSION}


# ------------------------
# Dependencies stage
# ------------------------
FROM base AS deps

# Copy only dependency files (better caching)
COPY package.json pnpm-lock.yaml ./

# Install dependencies 
RUN pnpm install --frozen-lockfile


# ------------------------
# Build stage
# ------------------------
FROM deps AS build

# Copy source code
COPY . .

# Build the application
RUN pnpm build


# ------------------------
# Final stage 
# ------------------------
FROM base AS final

WORKDIR /usr/src/app
ENV NODE_ENV=production

# Copy package.json & lock file
COPY package.json pnpm-lock.yaml ./

# Copy built application
COPY --from=build /usr/src/app/dist ./dist

# Copy node_modules 
COPY --from=deps /usr/src/app/node_modules ./node_modules

# Expose port
EXPOSE 4173

# Run vite preview
CMD ["pnpm", "preview", "--host", "--port", "4173"]
