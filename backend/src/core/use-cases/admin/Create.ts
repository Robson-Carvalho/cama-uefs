import { AdminRepository } from "../../../infrastructure/repositories/AdminRepository";
import { Encryption } from "../../../infrastructure/utils/Encryption";
import { Mailer } from "../../../infrastructure/services/email/Mailer";
import crypto from "crypto";

class Create {
  constructor(
    private _adminRepository: AdminRepository,
    private _encryption: Encryption,
    private _mailer: Mailer
  ) {}

  async execute(
    name: string,
    email: string
  ): Promise<string | null> {
    const tempPassword = crypto.randomBytes(6).toString("hex");
    const hashPassword = await this._encryption.hash(tempPassword);

    const id = await this._adminRepository.create(name, email, hashPassword);
    
    await this._mailer.welcomeInstructor(name, email, tempPassword);

    return id;
  }
}

export { Create };
