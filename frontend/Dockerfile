FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --prefer-offline --no-audit || npm install --prefer-offline --no-audit || npm install

COPY . .

EXPOSE 5173

CMD ["sh", "-c", "rm -rf node_modules/.vite && npm run dev"]
