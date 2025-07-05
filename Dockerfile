## FRONTEND (React) - Dockerfile

# Use official Node.js base image
FROM node:18-alpine as build

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install

# Copy source files
COPY frontend/ ./

# Build the React app
RUN npm run build

# Serve using nginx
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
