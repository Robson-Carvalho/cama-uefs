import { Mailer } from "../../../infrastructure/services/email/Mailer";
import { Encryption } from "../../../infrastructure/utils/Encryption";
import { IAdminRepository } from "../../domain/repositories/IAdminRepository";
import { IAdmin } from "../../dtos/AdminDTOs";
import { NotFoundError } from "../../errors/Errors";

class RecoverPassword {
  constructor(private _adminRepository: IAdminRepository) {}

  async execute(email: string): Promise<void> {
    const admin: IAdmin | null = await this._adminRepository.getByEmail(email);

    if (!admin) {
      throw new NotFoundError("Admin not found with e-mail.");
    }

    const newPassword = Math.floor(100000 + Math.random() * 900000).toString();

    const newPasswordHash = await Encryption.getInstance().hash(newPassword);

    await this._adminRepository.update(
      admin._id.toString(),
      admin.name,
      admin.email,
      newPasswordHash
    );

    await Mailer.getInstance().recoverPassword(
      admin.name,
      admin.email,
      newPassword
    );
  }
}

export { RecoverPassword };
