interface IPayload {
  admin: {
    name: string;
    email: string;
  };
  token: string;
}

export type { IPayload };
