import { AdminRepository } from "../../../infrastructure/repositories/AdminRepository";

import { Encryption } from "../../../infrastructure/utils/Encryption";
import { JWT } from "../../../infrastructure/utils/JWT";
import { IAdmin } from "../../dtos/AdminDTOs";

import { IPayload } from "../../dtos/AuthDTOs";
import { NotFoundError, UnauthorizedError } from "../../errors/Errors";

class SignIn {
  constructor(private _adminRepository: AdminRepository) {}

  async execute(email: string, password: string): Promise<IPayload | null> {
    const admin: IAdmin | null = await this._adminRepository.getByEmail(email);

    if (!admin) {
      throw new NotFoundError("Admin not found.");
    }

    const auth: boolean = await Encryption.getInstance().compare(
      password,
      admin.password
    );

    if (!auth) {
      throw new UnauthorizedError("E-mail and/or password invalid.");
    }

    const token: string = (await JWT.getInstance().sign(
      admin._id.toString()
    )) as string;

    const payload: IPayload = {
      admin: {
        id: admin._id.toString(),
        name: admin.name,
        email: admin.email,
      },
      token,
    };

    return payload as IPayload;
  }
}

export { SignIn };
