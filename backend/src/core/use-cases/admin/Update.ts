import { AdminRepository } from "../../../infrastructure/repositories/AdminRepository";
import { Encryption } from "../../../infrastructure/utils/Encryption";

class Update {
  constructor(
    private _adminRepository: AdminRepository,
    private _encryption: Encryption
  ) {}

  async execute(
    _id: string,
    name: string,
    email: string,
    password?: string
  ): Promise<void> {
    const hashPassword = password ? await this._encryption.hash(password) : undefined;

    await this._adminRepository.update(_id, name, email, hashPassword);
  }
}

export { Update };
