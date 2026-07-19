import { Resend } from "resend";
import { InternalServerError } from "../../../core/errors/Errors";
import { recoverPasswordTemplate } from "./templates/recoverPasswordTemplate";
import { changeEmailTemplate } from "./templates/changeEmailTemplate";
import { welcomeInstructorTemplate } from "./templates/welcomeInstructorTemplate";
import { newRevisionTemplate } from "./templates/newRevisionTemplate";
import { revisionAcceptedTemplate } from "./templates/revisionAcceptedTemplate";
import { revisionRejectedTemplate } from "./templates/revisionRejectedTemplate";

class Mailer {
  private resend: Resend;

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY as string);
  }

  public async recoverPassword(
    name: string,
    email: string,
    link: string
  ) {
    try {
      await this.resend.emails.send({
        from: process.env.MAIL_FROM || "cama-uefs@safeentrysistemas.com.br",
        to: email,
        subject: "CAMA/UEFS - Recuperação de senha",
        html: recoverPasswordTemplate(name, link),
      });
    } catch (error) {
      console.error("Error send email: ", error);
      throw new InternalServerError("Erro interno do servidor ao enviar e-mail.");
    }
  }

  public async changeEmail(
    name: string,
    email: string,
    link: string
  ) {
    try {
      await this.resend.emails.send({
        from: process.env.MAIL_FROM || "cama-uefs@safeentrysistemas.com.br",
        to: email,
        subject: "CAMA/UEFS - Confirmação de novo e-mail",
        html: changeEmailTemplate(name, link),
      });
    } catch (error) {
      console.error("Error send email: ", error);
      throw new InternalServerError("Erro interno do servidor ao enviar e-mail.");
    }
  }

  public async welcomeInstructor(
    name: string,
    email: string,
    tempPassword: string
  ) {
    try {
      await this.resend.emails.send({
        from: process.env.MAIL_FROM || "cama-uefs@safeentrysistemas.com.br",
        to: email,
        subject: "CAMA/UEFS - Bem-vindo à Plataforma",
        html: welcomeInstructorTemplate(name, tempPassword),
      });
    } catch (error) {
      console.error("Error send email: ", error);
      throw new InternalServerError("Erro interno do servidor ao enviar e-mail.");
    }
  }

  public async newRevision(
    authorEmail: string,
    authorName: string,
    revisorName: string,
    topicTitle: string
  ) {
    try {
      await this.resend.emails.send({
        from: process.env.MAIL_FROM || "cama-uefs@safeentrysistemas.com.br",
        to: authorEmail,
        subject: "CAMA/UEFS - Nova Sugestão de Edição",
        html: newRevisionTemplate(authorName, revisorName, topicTitle),
      });
    } catch (error) {
      console.error("Error send email: ", error);
    }
  }

  public async revisionAccepted(
    revisorEmail: string,
    revisorName: string,
    topicTitle: string,
    approverName: string
  ) {
    try {
      await this.resend.emails.send({
        from: process.env.MAIL_FROM || "cama-uefs@safeentrysistemas.com.br",
        to: revisorEmail,
        subject: "CAMA/UEFS - Sua sugestão foi aprovada!",
        html: revisionAcceptedTemplate(revisorName, topicTitle, approverName),
      });
    } catch (error) {
      console.error("Error send email: ", error);
    }
  }

  public async revisionRejected(
    revisorEmail: string,
    revisorName: string,
    topicTitle: string,
    approverName: string
  ) {
    try {
      await this.resend.emails.send({
        from: process.env.MAIL_FROM || "cama-uefs@safeentrysistemas.com.br",
        to: revisorEmail,
        subject: "CAMA/UEFS - Atualização sobre sua sugestão",
        html: revisionRejectedTemplate(revisorName, topicTitle, approverName),
      });
    } catch (error) {
      console.error("Error send email: ", error);
    }
  }
}

export { Mailer };
