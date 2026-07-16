import { compare, hash } from "bcryptjs";

class Encryption {
  private static instance: Encryption;
  private saltRounds = process.env.SALT_ROUNDS as string;

  private constructor() {}

  public static getInstance(): Encryption {
    if (!Encryption.instance) {
      Encryption.instance = new Encryption();
    }
    return Encryption.instance;
  }

  public hash(password: string) {
    return hash(password, parseInt(this.saltRounds));
  }

  public compare(sendPassword: string, hashPassword: string) {
    return compare(sendPassword, hashPassword);
  }
}

export { Encryption };
