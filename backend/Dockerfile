FROM node:20-alpine AS builder

WORKDIR /app 

COPY package*.json .

RUN npm ci --production

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
