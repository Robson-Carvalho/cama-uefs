import { IAdmin, IGetAdmins, IResponseAdminById } from "../../dtos/AdminDTOs";

interface IAdminRepository {
  get(skip?: number, take?: number): Promise<{ data: IGetAdmins[]; total: number }>;
  create(name: string, email: string, password: string): Promise<string | null>;
  getById(id: string): Promise<IResponseAdminById | null>;
  getByEmail(email: string): Promise<IAdmin | null>;
  update(
    id: string,
    name: string,
    email: string,
    password?: string
  ): Promise<void>;
  toggleActive(id: string, active: boolean): Promise<void>;
  changeRole(id: string, role: string): Promise<void>;
  delete(id: string): Promise<void>;
}

export { IAdminRepository };
