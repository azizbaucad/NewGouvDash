# Use the official Node.js image as the base image
# Replace the node js version
FROM node:18-alpine 

ARG APP_ENV

# Install NASM (Netwide Assembler)
RUN apk --no-cache add nasm

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./
COPY .npmrc ./
COPY ./config/development.yml  ./config/production.yml
COPY .env.$APP_ENV.example  ./.env.production.local

# Install dependencies
RUN yarn cache clean

# Install dependencies
RUN yarn install

# Copy the application code to the container
COPY . .

# Build the Next.js application
RUN yarn run build

# Expose the port that the application will run on
EXPOSE 3000

# Start the application
CMD ["yarn", "start"]
