# Use a multi-stage build to reduce the image size
# Stage 1: Build the application
FROM node:latest AS builder

WORKDIR /usr/src/app

COPY package*.json ./
COPY .npmrc ./

RUN npm i

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start"]