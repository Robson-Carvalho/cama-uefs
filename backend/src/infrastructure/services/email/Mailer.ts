import { Resend } from "resend";
import { InternalServerError } from "../../../core/errors/Errors";
import { recoverPasswordTemplate } from "./templates/recoverPasswordTemplate";

class Mailer {
  private resend: Resend;

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY as string);
  }

  public async recoverPassword(
    name: string,
    email: string,
    newPassword: string
  ) {
    try {
      await this.resend.emails.send({
        from: process.env.MAIL_FROM || "cama-uefs@safeentrysistemas.com.br",
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
