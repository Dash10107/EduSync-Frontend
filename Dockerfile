# Builder stage
FROM node:alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

# Build the application
RUN npm run build

# Final stage
FROM nginx:alpine

# Copy built assets from the builder stage to Nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
