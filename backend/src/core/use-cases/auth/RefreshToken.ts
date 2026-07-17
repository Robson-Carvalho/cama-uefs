import { AdminRepository } from "../../../infrastructure/repositories/AdminRepository";
import { JWT } from "../../../infrastructure/utils/JWT";
import { IPayload } from "../../dtos/AuthDTOs";
import { UnauthorizedError, NotFoundError } from "../../errors/Errors";

class RefreshToken {
  constructor(
    private _adminRepository: AdminRepository,
    private _jwt: JWT
  ) {}

  async execute(refreshToken: string): Promise<IPayload | null> {
    if (!refreshToken) {
      throw new UnauthorizedError("Refresh token não fornecido.");
    }

    let decoded: any;
    try {
      decoded = this._jwt.verify(refreshToken);
    } catch (err: any) {
      if (err.name === "TokenExpiredError") {
        // Specific error message to trigger redirect to login
        throw new UnauthorizedError("Sessão expirada. Por favor, faça login novamente.");
      }
      throw new UnauthorizedError("Refresh token inválido.");
    }

    if (decoded.type !== 'refresh') {
      throw new UnauthorizedError("Token fornecido não é um refresh token.");
    }

    const admin = await this._adminRepository.getById(decoded.id);

    if (!admin) {
      throw new NotFoundError("Instrutor não encontrado.");
    }

    if (!admin.active) {
      throw new UnauthorizedError("Sua conta está desativada. Entre em contato com um administrador.");
    }

    const newAccessToken: string = this._jwt.signWithExpiration({
      id: admin.id,
      role: admin.role,
      type: 'access'
    }, "2h");

    const newRefreshToken: string = this._jwt.signWithExpiration({
      id: admin.id,
      role: admin.role,
      type: 'refresh'
    }, "7d");

    const payload: IPayload = {
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        active: admin.active,
      },
      token: newAccessToken,
      refreshToken: newRefreshToken,
    };

    return payload;
  }
}

export { RefreshToken };
