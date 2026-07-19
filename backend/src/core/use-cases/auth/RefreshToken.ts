import { AdminRepository } from "../../../infrastructure/repositories/AdminRepository";
import { RefreshTokenRepository } from "../../../infrastructure/repositories/RefreshTokenRepository";
import { JWT } from "../../../infrastructure/utils/JWT";
import { IPayload } from "../../dtos/AuthDTOs";
import { UnauthorizedError, NotFoundError } from "../../errors/Errors";

class RefreshToken {
  constructor(
    private _adminRepository: AdminRepository,
    private _refreshTokenRepository: RefreshTokenRepository,
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

    if ((admin as any).sessionVersion !== decoded.sessionVersion) {
      await this._refreshTokenRepository.deleteAllFromUser(admin.id);
      throw new UnauthorizedError("Sessão expirada ou invalidada. Faça login novamente.");
    }

    const savedToken = await this._refreshTokenRepository.getByToken(refreshToken);
    if (!savedToken) {
      throw new UnauthorizedError("Refresh token não encontrado no banco ou já utilizado.");
    }
    
    // Deleta o token antigo pois já será substituído
    await this._refreshTokenRepository.delete(refreshToken);

    const newAccessToken: string = this._jwt.signWithExpiration({
      id: admin.id,
      role: admin.role,
      type: 'access',
      sessionVersion: (admin as any).sessionVersion
    }, "2h");

    const newRefreshToken: string = this._jwt.signWithExpiration({
      id: admin.id,
      role: admin.role,
      type: 'refresh',
      sessionVersion: (admin as any).sessionVersion
    }, "7d");

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);
    await this._refreshTokenRepository.create(admin.id, newRefreshToken, expiresAt);

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
