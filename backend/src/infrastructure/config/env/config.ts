import dotenv from "dotenv";

dotenv.config();

if (!process.env.DATABASE_URL) {
  console.warn(
    "⚠️  Warning: DATABASE_URL is not defined in the environment variables."
  );
}
