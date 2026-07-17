import "dotenv/config";

import { app } from "./app";

import { seedDefaultAdmin } from "./infrastructure/databases/seed";

const PORT = process.env.PORT || 3001;

app.listen(PORT, async () => {
  await seedDefaultAdmin();
  console.log(`Server running on port: ${PORT}`);
});
