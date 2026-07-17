import { IAdminRepository } from "../../core/domain/repositories/IAdminRepository";
import {
  IAdmin,
  IGetAdmins,
  IResponseAdminById,
} from "../../core/dtos/AdminDTOs";
import { InternalServerError, NotFoundError, ValidationError } from "../../core/errors/Errors";
import { prisma } from "../databases/prismaClient";

class AdminRepository implements IAdminRepository {
  async get(): Promise<IGetAdmins[] | []> {
    try {
      const admins = await prisma.admin.findMany({
        select: { id: true, name: true, email: true, role: true, active: true },
        orderBy: { name: "asc" },
      });
      return admins as unknown as IGetAdmins[];
    } catch (error) {
      console.error(error);
      throw new InternalServerError("Erro ao buscar instrutores.");
    }
  }

  async create(
    name: string,
    email: string,
    password: string
  ): Promise<string | null> {
    try {
      const admin = await prisma.admin.create({
        data: { name, email, password },
        select: { id: true },
      });
      return admin.id;
    } catch (error: any) {
      if (error.code === "P2002") {
        throw new ValidationError("Este e-mail já está cadastrado para outro instrutor.");
      }
      console.error(error);
      throw new InternalServerError("Erro ao criar instrutor.");
    }
  }

  async getById(id: string): Promise<IResponseAdminById | null> {
    try {
      const admin = await prisma.admin.findUnique({
        where: { id },
        select: { id: true, name: true, email: true, role: true, active: true },
      });

      if (!admin) throw new NotFoundError("Instrutor não encontrado.");

      return admin as unknown as IResponseAdminById;
    } catch (error) {
      if (error instanceof NotFoundError) throw error;
      console.error(error);
      throw new InternalServerError("Erro ao buscar instrutor por ID.");
    }
  }

  async getByEmail(email: string): Promise<IAdmin | null> {
    try {
      return await prisma.admin.findUnique({ where: { email } }) as unknown as IAdmin | null;
    } catch (error) {
      console.error(error);
      throw new InternalServerError("Erro ao buscar instrutor por e-mail.");
    }
  }

  async update(
    id: string,
    name: string,
    email: string,
    password?: string
  ): Promise<void> {
    try {
      await prisma.admin.update({
        where: { id },
        data: { name, email, password },
      });
    } catch (error: any) {
      if (error.code === "P2002") {
        throw new ValidationError("Este e-mail já está cadastrado para outro instrutor.");
      }
      console.error(error);
      throw new InternalServerError("Erro ao atualizar instrutor.");
    }
  }

  async toggleActive(id: string, active: boolean): Promise<void> {
    try {
      await prisma.admin.update({
        where: { id },
        data: { active } as any,
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerError("Erro ao alterar status do instrutor.");
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await prisma.admin.delete({ where: { id } });
    } catch (error) {
      console.error(error);
      throw new InternalServerError("Erro ao deletar instrutor.");
    }
  }
}

export { AdminRepository };
