# # Use an official Node runtime as a parent image
FROM node:14

# # Set the working directory in the container
WORKDIR /usr/src/app

# # Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# # Install npm dependencies
RUN npm install

# # Copy the 'front-end' directory into the Docker image
COPY front-end ./front-end

# # Copy the rest of your application code
COPY . .

# # Expose port 4000 for the central server
EXPOSE 4000

# # Command to run the application
CMD ["node", "server.js"]
