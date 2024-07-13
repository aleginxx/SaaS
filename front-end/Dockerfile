# Use an official Node runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Bundle app source
COPY . /usr/src/app/front-end/

# Copy the current directory contents into the container at /usr/src/app
COPY . .

# Install serve globally
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["serve", "-s", "."]
