import { Mailer } from "../../../infrastructure/services/email/Mailer";
import { JWT } from "../../../infrastructure/utils/JWT";
import { IAdminRepository } from "../../domain/repositories/IAdminRepository";
import { NotFoundError, ValidationError } from "../../errors/Errors";

class RequestEmailChange {
  constructor(
    private _adminRepository: IAdminRepository,
    private _mailer: Mailer,
    private _jwt: JWT
  ) {}

  async execute(adminId: string, newEmail: string): Promise<void> {
    const admin = await this._adminRepository.getById(adminId);

    if (!admin) {
      throw new NotFoundError("Instrutor não encontrado.");
    }

    const emailInUse = await this._adminRepository.getByEmail(newEmail);
    if (emailInUse) {
      throw new ValidationError("Este e-mail já está em uso por outro instrutor.");
    }

    const token = this._jwt.signWithExpiration({ id: admin.id, newEmail, action: 'change_email' }, "15m");
    const link = `${process.env.FRONTEND_URL || "http://localhost:3000"}/admin/settings/confirm-email?token=${token}`;

    await this._mailer.changeEmail(
      admin.name,
      newEmail,
      link
    );
  }
}

export { RequestEmailChange };
