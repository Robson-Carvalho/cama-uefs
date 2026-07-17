import { AdminRepository } from "../../../infrastructure/repositories/AdminRepository";

import { Encryption } from "../../../infrastructure/utils/Encryption";
import { JWT } from "../../../infrastructure/utils/JWT";
import { IAdmin } from "../../dtos/AdminDTOs";

import { IPayload } from "../../dtos/AuthDTOs";
import { NotFoundError, UnauthorizedError } from "../../errors/Errors";

class SignIn {
  constructor(
    private _adminRepository: AdminRepository,
    private _encryption: Encryption,
    private _jwt: JWT
  ) {}

  async execute(email: string, password: string): Promise<IPayload | null> {
    const admin: IAdmin | null = await this._adminRepository.getByEmail(email);

    if (!admin) {
      throw new NotFoundError("Instrutor não encontrado.");
    }

    if (!admin.active) {
      throw new UnauthorizedError("Sua conta está desativada. Entre em contato com um administrador.");
    }

    const auth: boolean = await this._encryption.compare(
      password,
      admin.password
    );

    if (!auth) {
      throw new UnauthorizedError("E-mail ou senha inválidos.");
    }

    const token: string = (await this._jwt.signWithExpiration({
      id: admin.id,
      role: admin.role,
      type: 'access'
    }, "2h")) as string;

    const refreshToken: string = (await this._jwt.signWithExpiration({
      id: admin.id,
      role: admin.role,
      type: 'refresh'
    }, "7d")) as string;

    const payload: IPayload = {
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        active: admin.active,
      },
      token,
      refreshToken,
    };

    return payload as IPayload;
  }
}

export { SignIn };
