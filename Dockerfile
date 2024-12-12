# Use the official Node.js image
FROM node:18 AS base
WORKDIR /usr/src/app

# Install all dependencies
FROM base AS dependencies
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Build the application
FROM dependencies AS build
COPY . .
ENV NODE_ENV=production
RUN npm run build

# Create the production image
FROM node:18 AS release
WORKDIR /usr/src/app

# Copy built files and node_modules
COPY --from=build /usr/src/app/dist ./dist
COPY --from=dependencies /usr/src/app/node_modules ./node_modules

# Install a lightweight server for serving static files
RUN npm install -g serve

# Debugging: Ensure `serve` is installed and `dist` exists
RUN which serve
RUN ls -l dist

# Expose the port the app runs on
EXPOSE 80

# Command to run the application
CMD ["serve", "-s", "dist", "-l", "80"]
