FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache tzdata

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "run", "dev"]
