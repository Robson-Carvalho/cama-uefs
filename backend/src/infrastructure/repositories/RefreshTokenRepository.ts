import { prisma } from "../databases/prismaClient";

export class RefreshTokenRepository {
  async create(adminId: string, token: string, expiresAt: Date) {
    return prisma.refreshToken.create({
      data: {
        adminId,
        token,
        expiresAt,
      },
    });
  }

  async getByToken(token: string) {
    return prisma.refreshToken.findUnique({
      where: { token },
      include: { admin: true },
    });
  }

  async delete(token: string) {
    return prisma.refreshToken.delete({
      where: { token },
    });
  }

  async deleteAllFromUser(adminId: string) {
    return prisma.refreshToken.deleteMany({
      where: { adminId },
    });
  }
}
