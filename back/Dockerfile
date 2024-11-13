# Use Node.js 18 as the base image
FROM node:18 as build

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the entire project and build it
COPY . .
RUN npm run build

# Use a smaller Node.js image for the final stage
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy built files from the previous stage
COPY --from=build /app/dist /app/dist
COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Expose the NestJS port
EXPOSE 3000

# Start the application
CMD ["node", "dist/main.js"]

# Use the official MySQL image as a base
FROM mysql:8.0

# Set environment variables for MySQL
ENV MYSQL_ROOT_PASSWORD=rootpassword
ENV MYSQL_DATABASE=mydatabase

# Copy the SQL script into the appropriate folder
COPY script.sql /docker-entrypoint-initdb.d/

# Expose MySQL port (optional, for external connections)
EXPOSE 3306
