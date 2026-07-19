import { baseEmailTemplate } from "./baseEmailTemplate";

const changeEmailTemplate = (name: string, link: string) => {
  const content = `
    <p>Olá, <strong>${name.split(" ")[0]}</strong>,</p>
    <p>Você solicitou a alteração do seu endereço de e-mail na plataforma. Para confirmar essa mudança, clique no botão abaixo:</p>
    
    <div style="text-align: center; margin: 32px 0;">
      <a href="${link}" style="display: inline-block; background-color: #4f46e5; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">Confirmar Novo E-mail</a>
    </div>
    
    <p>Este link é válido por 15 minutos.</p>
    <p style="margin-bottom: 0;">Se você não solicitou essa alteração, por favor, ignore este e-mail. Nenhuma alteração será feita na sua conta.</p>
  `;

  return baseEmailTemplate("Confirmação de Alteração de E-mail", content);
};

export { changeEmailTemplate };
