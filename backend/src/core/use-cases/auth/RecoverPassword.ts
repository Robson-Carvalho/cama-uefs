import { JWT } from "../../../infrastructure/utils/JWT";
import { Mailer } from "../../../infrastructure/services/email/Mailer";
import { IAdminRepository } from "../../domain/repositories/IAdminRepository";
import { IAdmin } from "../../dtos/AdminDTOs";
import { NotFoundError } from "../../errors/Errors";

class RecoverPassword {
  constructor(
    private _adminRepository: IAdminRepository,
    private _mailer: Mailer,
    private _jwt: JWT
  ) {}

  async execute(email: string): Promise<void> {
    const admin: IAdmin | null = await this._adminRepository.getByEmail(email);

    if (!admin) {
      throw new NotFoundError("Nenhum instrutor encontrado com este e-mail.");
    }

    const token = this._jwt.signWithExpiration({ email: admin.email, action: 'recover_password' }, "15m");
    const link = `${process.env.FRONTEND_URL || "http://localhost:3000"}/admin/recoverPassword/confirm?token=${token}`;

    await this._mailer.recoverPassword(
      admin.name,
      admin.email,
      link
    );
  }
}


export { RecoverPassword };
