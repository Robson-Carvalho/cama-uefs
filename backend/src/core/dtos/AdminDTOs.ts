interface IAdmin {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  active: boolean;
}

interface IGetAdmins {
  id: string;
  name: string;
  email: string;
  role: string;
  active: boolean;
}

interface IResponseAdminById {
  id: string;
  name: string;
  email: string;
  role: string;
  active: boolean;
}

export { IAdmin, IGetAdmins, IResponseAdminById };
