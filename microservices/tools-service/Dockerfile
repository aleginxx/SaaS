# Use an official Node runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Copy all local files to the container's working directory
COPY . .

# Expose the port your app runs on
EXPOSE 3002

# Command to run the application
CMD ["node", "index.js"]
