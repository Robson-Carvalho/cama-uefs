import nodemailer from "nodemailer";
import { InternalServerError } from "../../../core/errors/Errors";
import { recoverPasswordTemplate } from "./templates/recoverPasswordTemplate";

class Mailer {
  private static instance: Mailer;

  private transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL_USER as string,
      pass: process.env.NODEMAILER_PASSWORD as string,
    },
  });

  private constructor() {}

  public static getInstance(): Mailer {
    if (!Mailer.instance) {
      Mailer.instance = new Mailer();
    }

    return Mailer.instance;
  }

  public async recoverPassword(
    name: string,
    email: string,
    newPassword: string
  ) {
    try {
      await this.transporter.sendMail({
        from: `${process.env.EMAIL_USER}`,
        to: email,
        subject: "CAMA/UEFS - Recuperação de senha",
        html: recoverPasswordTemplate(name, newPassword),
      });
    } catch (error) {
      console.error("Error send email: ", error);
      throw new InternalServerError("Internal Server Error.");
    }
  }
}

export { Mailer };
