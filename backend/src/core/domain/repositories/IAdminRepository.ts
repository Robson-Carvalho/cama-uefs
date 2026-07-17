import { IAdmin, IGetAdmins, IResponseAdminById } from "../../dtos/AdminDTOs";

interface IAdminRepository {
  get(): Promise<IGetAdmins[] | []>;
  create(name: string, email: string, password: string): Promise<string | null>;
  getById(id: string): Promise<IResponseAdminById | null>;
  getByEmail(email: string): Promise<IAdmin | null>;
  update(
    id: string,
    name: string,
    email: string,
    password?: string
  ): Promise<void>;
  delete(id: string): Promise<void>;
}

export { IAdminRepository };
