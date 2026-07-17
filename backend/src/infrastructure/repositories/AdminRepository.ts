import { IAdminRepository } from "../../core/domain/repositories/IAdminRepository";
import {
  IAdmin,
  IGetAdmins,
  IResponseAdminById,
} from "../../core/dtos/AdminDTOs";
import { InternalServerError, NotFoundError } from "../../core/errors/Errors";
import { prisma } from "../databases/prismaClient";

class AdminRepository implements IAdminRepository {
  async get(): Promise<IGetAdmins[] | []> {
    try {
      return await prisma.admin.findMany({
        select: { name: true },
        orderBy: { name: "asc" },
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerError("Error fetching admins.");
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
    } catch (error) {
      console.error(error);
      throw new InternalServerError("Error creating admin.");
    }
  }

  async getById(id: string): Promise<IResponseAdminById | null> {
    try {
      const admin = await prisma.admin.findUnique({
        where: { id },
        select: { id: true, name: true, email: true },
      });

      if (!admin) throw new NotFoundError("Admin not found.");

      return admin;
    } catch (error) {
      if (error instanceof NotFoundError) throw error;
      console.error(error);
      throw new InternalServerError("Error getting admin by id.");
    }
  }

  async getByEmail(email: string): Promise<IAdmin | null> {
    try {
      return await prisma.admin.findUnique({ where: { email } });
    } catch (error) {
      console.error(error);
      throw new InternalServerError("Error getting admin by email.");
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
    } catch (error) {
      console.error(error);
      throw new InternalServerError("Error updating admin.");
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await prisma.admin.delete({ where: { id } });
    } catch (error) {
      console.error(error);
      throw new InternalServerError("Error deleting admin.");
    }
  }
}

export { AdminRepository };
