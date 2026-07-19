# Stage 1: Build the React application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install --prefer-offline --no-audit

# Copy the rest of the application
COPY . .

# Build the app for production (this uses the env variables available at build time)
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

COPY --from=builder /app/build /usr/share/nginx/html

# Copy the custom Nginx configuration for React Router
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
