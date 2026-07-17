interface IPayload {
  admin: {
    id: string;
    name: string;
    email: string;
    role: string;
    active: boolean;
  };
  token: string;
}

export { IPayload };
