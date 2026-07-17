import jwt from "jsonwebtoken";

class JWT {
  private jwtSecret = process.env.JWT_SECRET as string;

  constructor() {}

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
