import { AdminRepository } from "../../../infrastructure/repositories/AdminRepository";
import { Encryption } from "../../../infrastructure/utils/Encryption";

class Create {
  constructor(private _adminRepository: AdminRepository) {}

  async execute(
    name: string,
    email: string,
    password: string
  ): Promise<string | null> {
    const hashPassword = await Encryption.getInstance().hash(password);

    return await this._adminRepository.create(name, email, hashPassword);
  }
}

export { Create };
