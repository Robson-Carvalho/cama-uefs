import { JWT } from "../../../infrastructure/utils/JWT";
import { IAdminRepository } from "../../domain/repositories/IAdminRepository";
import { NotFoundError, ValidationError } from "../../errors/Errors";

class ConfirmEmailChange {
  constructor(
    private _adminRepository: IAdminRepository,
    private _jwt: JWT
  ) {}

  async execute(token: string): Promise<void> {
    try {
      const decoded: any = this._jwt.verify(token);
      
      if (!decoded || !decoded.id || !decoded.newEmail || decoded.action !== 'change_email') {
        throw new ValidationError("Token inválido ou expirado.");
      }

      const admin = await this._adminRepository.getById(decoded.id);

      if (!admin) {
        throw new NotFoundError("Admin not found.");
      }

      await this._adminRepository.update(
        admin.id,
        admin.name,
        decoded.newEmail
      );
    } catch (e: any) {
      throw new ValidationError("Token inválido ou expirado.");
    }
  }
}

export { ConfirmEmailChange };
