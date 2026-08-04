import jwt from "jsonwebtoken";

class JWT {
  private jwtSecret = process.env.JWT_SECRET as string;

  constructor() {}

  public sign(payload: any) {
    const token = jwt.sign(payload, this.jwtSecret, {
      expiresIn: "24h",
    });

    return token;
  }

  public signWithExpiration(payload: any, expiresIn: string | number) {
    const token = jwt.sign(payload, this.jwtSecret, {
      expiresIn: expiresIn as any,
    });
    return token;
  }

  public verify(token: string) {
    const decoded = jwt.verify(token, this.jwtSecret);

    return decoded;
  }
}

export { JWT };
