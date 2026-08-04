import { baseEmailTemplate } from "./baseEmailTemplate";

const recoverPasswordTemplate = (name: string, link: string) => {
  const content = `
    <p>Olá, <strong>${name.split(" ")[0]}</strong>,</p>
    <p>Você solicitou a recuperação de senha. Clique no botão abaixo para criar uma nova senha:</p>
    
    <div style="text-align: center; margin: 32px 0;">
      <a href="${link}" style="display: inline-block; background-color: #4f46e5; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">Redefinir Senha</a>
    </div>
    
    <p>Este link é válido por apenas 15 minutos.</p>
    <p style="margin-bottom: 0;">Se você não solicitou essa alteração, nenhuma ação é necessária e sua senha permanecerá segura.</p>
  `;

  return baseEmailTemplate("Recuperação de Senha", content);
};

export { recoverPasswordTemplate };
