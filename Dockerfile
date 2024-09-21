# Use the official Node.js image
FROM node:22.3.0 AS base
WORKDIR /usr/src/app

# Install dependencies into a temporary directory
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json /temp/dev/
RUN cd /temp/dev && npm install --frozen-lockfile

# Install with --production (exclude devDependencies)
RUN mkdir -p /temp/prod
COPY package.json /temp/prod/
RUN cd /temp/prod && npm install --production --frozen-lockfile

# Copy node_modules from the temporary directory
FROM base AS prerelease
COPY --from=install /temp/dev/node_modules ./node_modules
COPY . .

# [optional] tests & build
ENV NODE_ENV=production
RUN npm run build

# Copy production dependencies and source code into the final image
FROM base AS release
COPY --from=install /temp/prod/node_modules ./node_modules
COPY --from=prerelease /usr/src/app .


# Run the app
EXPOSE 80/tcp
CMD ["npm", "run", "dev"]
