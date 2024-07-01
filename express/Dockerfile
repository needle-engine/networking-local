# node
FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .


WORKDIR /usr/src/app

EXPOSE 3000
CMD echo "Starting server..." && \
    npm run start