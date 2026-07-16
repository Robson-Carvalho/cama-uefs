declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV?: "development" | "production" | "test";
    PORT?: string;
    DATABASE_URL?: string;
    POSTGRES_HOST?: string;
    POSTGRES_PORT?: string;
    POSTGRES_DB?: string;
    POSTGRES_USER?: string;
    POSTGRES_PASSWORD?: string;
    JWT_SECRET?: string;
    FRONTEND_URL?: string;
    NODEMAILER_EMAIL_USER?: string;
    NODEMAILER_PASSWORD?: string;
  }
}
