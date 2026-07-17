import { prisma } from "./prismaClient";
import bcrypt from "bcryptjs";

const seedDefaultAdmin = async () => {
  try {
    const adminCount = await prisma.admin.count();

    if (adminCount === 0) {
      console.log("Nenhum admin encontrado no banco de dados. Criando admin padrão...");
      
      const defaultEmail = process.env.DEFAULT_ADMIN_EMAIL || "admin@uefs.br";
      const defaultPassword = process.env.DEFAULT_ADMIN_PASSWORD || "admin123";
      
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(defaultPassword, salt);

      await prisma.admin.create({
        data: {
          name: "Administrador Padrão",
          email: defaultEmail,
          password: hashedPassword,
          role: "ADMIN",
        },
      });

      console.log(`✅ Admin padrão criado com sucesso!`);
      console.log(`📧 E-mail: ${defaultEmail}`);
      console.log(`🔑 Senha: ${defaultPassword}`);
    } else {
      console.log("✅ PostgreSQL connected via Prisma.");
    }
  } catch (error) {
    console.error("Erro ao verificar/criar admin padrão:", error);
  }
};

export { seedDefaultAdmin };
