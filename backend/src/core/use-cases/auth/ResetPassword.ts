import { JWT } from "../../../infrastructure/utils/JWT";
import { Encryption } from "../../../infrastructure/utils/Encryption";
import { IAdminRepository } from "../../domain/repositories/IAdminRepository";
import { NotFoundError, ValidationError } from "../../errors/Errors";

class ResetPassword {
  constructor(
    private _adminRepository: IAdminRepository,
    private _encryption: Encryption,
    private _jwt: JWT
  ) {}

  async execute(token: string, newPassword: string): Promise<void> {
    try {
      const decoded: any = this._jwt.verify(token);
      
      if (!decoded || !decoded.email || decoded.action !== 'recover_password') {
        throw new ValidationError("Token inválido ou expirado.");
      }

      const admin = await this._adminRepository.getByEmail(decoded.email);

      if (!admin) {
        throw new NotFoundError("Nenhum instrutor encontrado com este e-mail.");
      }

      const newPasswordHash = await this._encryption.hash(newPassword);

      await this._adminRepository.update(
        admin.id,
        admin.name,
        admin.email,
        newPasswordHash
      );
    } catch (e: any) {
      throw new ValidationError("Token inválido ou expirado.");
    }
  }
}

export { ResetPassword };
