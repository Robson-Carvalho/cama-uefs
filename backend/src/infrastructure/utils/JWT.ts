import jwt from "jsonwebtoken";

class JWT {
  private static instance: JWT;
  private jwtSecret = process.env.JWT_SECRET as string;

  private constructor() {}

  public static getInstance(): JWT {
    if (!JWT.instance) {
      JWT.instance = new JWT();
    }
    return JWT.instance;
  }

  public sign(_id: string) {
    const token = jwt.sign({ id: _id }, this.jwtSecret, {
      expiresIn: "24h",
    });

    return token;
  }

  public verify(token: string) {
    const decoded = jwt.verify(token, this.jwtSecret);

    return decoded;
  }
}

export { JWT };
