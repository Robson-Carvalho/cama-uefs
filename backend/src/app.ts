import express, { Application } from "express";
import cors from "cors";

import { errorHandler } from "./application/middlewares/errorHandler";
import { router } from "./application/routers/router";
import { prisma } from "./infrastructure/databases/prismaClient";

const app: Application = express();

// Valida conexão com o banco na inicialização
prisma.$connect().then(() => {
  console.log("✅ PostgreSQL connected via Prisma.");
});

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use("/api/v1", router);
app.use(errorHandler);

export { app };
