import { compare, hash } from "bcryptjs";

class Encryption {
  private saltRounds = process.env.SALT_ROUNDS as string;

  constructor() {}

  public hash(password: string) {
    return hash(password, parseInt(this.saltRounds));
  }

  public compare(sendPassword: string, hashPassword: string) {
    return compare(sendPassword, hashPassword);
  }
}

export { Encryption };
