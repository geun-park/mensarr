# Use the official Node.js image as the base image
FROM node:22-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and yarn.lock files to the working directory
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code to the working directory
COPY . .

# Install Expo CLI globally
RUN yarn global add expo-cli

RUN yarn install

# Start the Expo development server
# CMD ["yarn", "start"]
CMD ["tail", "-f", "/dev/null"]