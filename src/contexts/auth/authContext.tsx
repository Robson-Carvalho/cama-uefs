import { IPayload } from "@/interfaces/IPayload";

import { createContext } from "react";

interface IAuthContext {
  login(email: string, password: string): Promise<number>;
  logout(): void;
  payload?: IPayload | null;
  authenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export { AuthContext };
