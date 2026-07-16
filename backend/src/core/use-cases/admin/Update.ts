import { AdminRepository } from "../../../infrastructure/repositories/AdminRepository";
import { Encryption } from "../../../infrastructure/utils/Encryption";

class Update {
  constructor(private _adminRepository: AdminRepository) {}

  async execute(
    _id: string,
    name: string,
    email: string,
    password: string
  ): Promise<void> {
    const hashPassword = await Encryption.getInstance().hash(password);

    await this._adminRepository.update(_id, name, email, hashPassword);
  }
}

export { Update };
