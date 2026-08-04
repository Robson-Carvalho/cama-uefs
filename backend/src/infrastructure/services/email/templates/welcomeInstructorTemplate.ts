import { baseEmailTemplate } from "./baseEmailTemplate";

const welcomeInstructorTemplate = (name: string, tempPassword: string) => {
  const content = `
    <p>Olá, <strong>${name.split(" ")[0]}</strong>,</p>
    <p>Bem-vindo(a) à plataforma <strong>OBI-UEFS</strong>! Sua conta de instrutor foi criada com sucesso.</p>
    <p>Para o seu primeiro acesso, utilize a senha temporária gerada automaticamente pelo nosso sistema:</p>
    
    <div style="text-align: center; margin: 32px 0;">
      <span style="display: inline-block; background-color: #f1f5f9; border: 1px dashed #94a3b8; color: #1e293b; padding: 14px 28px; border-radius: 6px; font-weight: 700; font-size: 20px; letter-spacing: 2px;">
        ${tempPassword}
      </span>
    </div>
    
    <p>Por questões de segurança, recomendamos fortemente que você altere sua senha no primeiro login, acessando a aba <strong>Configurações</strong>.</p>
    
    <div style="text-align: center; margin: 32px 0;">
      <a href="${process.env.FRONTEND_URL || "http://localhost:5173"}/admin/login" style="display: inline-block; background-color: #4f46e5; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">Acessar Plataforma</a>
    </div>
    
    <p style="margin-bottom: 0;">Se tiver alguma dúvida, nossa equipe está sempre à disposição para ajudar.</p>
  `;

  return baseEmailTemplate("Bem-vindo(a) à OBI-UEFS!", content);
};

export { welcomeInstructorTemplate };
