FROM node AS builder

WORKDIR /app 

COPY package*.json ./ 
COPY . .

RUN npm install
RUN npm run build 

FROM node:20-alpine AS runner

WORKDIR /app 

COPY --from=builder /app/.next ./.next 
COPY --from=builder /app/package*.json .

RUN npm ci --production

EXPOSE 3000

CMD ["npm", "start"]
