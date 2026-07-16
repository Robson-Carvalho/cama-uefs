FROM node:20-alpine

WORKDIR /usr/src/app

RUN apk add --no-cache tzdata

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]
