# ---------- Builder ----------
FROM node:20-alpine AS builder

WORKDIR /app

# Copy prisma schema FIRST (needed before npm install if postinstall exists)
COPY package*.json ./
COPY prisma ./prisma/
COPY prisma.config.ts ./

RUN npm install --no-audit || npm install --no-audit || npm install

# Generate Prisma Client
RUN npx prisma generate

# Copy remaining source
COPY . .

# ---------- Runtime ----------
FROM node:20-alpine AS runtime

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./
COPY --from=builder /app/tsconfig.json ./
COPY --from=builder /app/src ./src

EXPOSE 3001

CMD ["sh", "-c", "npx prisma generate && npx ts-node-dev --respawn --transpile-only src/server.ts"]
