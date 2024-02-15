# syntax=docker/dockerfile:1

ARG NODE_VERSION=21.4.0
ARG NODE_ENV=production

################################################################################
# Use node image as base image for all stages.
FROM node:${NODE_VERSION}-alpine as base

# Set working directory for all build stages.
WORKDIR /usr/src/app

# Allow docker compose to override the NODE_ENV value during build.
ENV NODE_ENV $NODE_ENV

################################################################################
# Create a stage for installing production dependencies.
FROM base as deps

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# Leverage bind mounts to package.json and package-lock.json to avoid copying them.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

################################################################################
# Create a stage for building the application.
FROM deps as build

# Download development dependencies and do a clean install before building.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci

# Copy the rest of the source files into the image.
COPY . .

# Copy AI models into the image.
COPY public/models ./public/models

# Run the build script.
RUN npm run build

################################################################################
# Create a new stage for development.
FROM build as development

# Use development node environment by default.
ENV NODE_ENV development

# Copy node modules into the image.
COPY --from=build /usr/src/app/node_modules ./node_modules

# Expose the port for development.
EXPOSE 3000

# Allow all available network interfaces to access the application.
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Run the application in development mode.
CMD npm run dev

################################################################################
# Create a new stage to run the application with minimal runtime dependencies
# where the necessary files are copied from the build stage.
FROM base as final

# Use production node environment by default.
ENV NODE_ENV production

# Copy package.json so that package manager commands can be used.
COPY package.json .

# Copy AI models for face detection service to use.
COPY --from=build /usr/src/app/public/models ./public/models

# Automatically leverage output traces to reduce image size.
COPY --from=build /usr/src/app/.next/standalone ./
COPY --from=build /usr/src/app/.next/static ./.next/static

# Set the correct user:group permission for prerender cache.
RUN chown node:node .next

# Run the application as a non-root user.
USER node

# Expose the port that the application listens on.
EXPOSE 3000

# Allow all available network interfaces to access the application.
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Run the application.
CMD ["node", "server.js"]