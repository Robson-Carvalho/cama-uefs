interface IAdmin {
  id: string;
  name: string;
  email: string;
  password: string;
}

interface IGetAdmins {
  name: string;
}

interface IResponseAdminById {
  id: string;
  name: string;
  email: string;
}

export { IAdmin, IGetAdmins, IResponseAdminById };
