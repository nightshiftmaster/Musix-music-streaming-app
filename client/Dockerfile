# Use an official Node.js image as the base image
FROM node:18-alpine

# Set the working directory in the container to /app
WORKDIR /app

# Copy the server package.json and package-lock.json to the container
COPY package.json .

# Install dependencies
RUN npm install

# Copy the rest of the server's code to the container
COPY . .

# Expose the port your server listens on (adjust if needed)
EXPOSE 3000

# Set the command to start your server
CMD ["npm", "run", "dev"]
