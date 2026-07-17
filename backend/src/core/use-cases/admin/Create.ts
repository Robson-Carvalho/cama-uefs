import { AdminRepository } from "../../../infrastructure/repositories/AdminRepository";
import { Encryption } from "../../../infrastructure/utils/Encryption";

class Create {
  constructor(
    private _adminRepository: AdminRepository,
    private _encryption: Encryption
  ) {}

  async execute(
    name: string,
    email: string,
    password: string
  ): Promise<string | null> {
    const hashPassword = await this._encryption.hash(password);

    return await this._adminRepository.create(name, email, hashPassword);
  }
}

export { Create };
