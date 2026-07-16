interface IPayload {
  admin: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
}

export { IPayload };
