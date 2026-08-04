import { baseEmailTemplate } from "./baseEmailTemplate";

const newRevisionTemplate = (
  authorName: string,
  revisorName: string,
  topicTitle: string
) => {
  const content = `
    <p>Olá, <strong>${authorName.split(" ")[0]}</strong>,</p>
    <p>O colaborador <strong>${revisorName}</strong> acabou de enviar uma sugestão de edição para o seu tópico:</p>
    
    <div style="background-color: #f1f5f9; border-left: 4px solid #4f46e5; padding: 16px; margin: 24px 0; border-radius: 4px;">
      <p style="margin: 0; font-weight: 600; color: #1e293b;">${topicTitle}</p>
    </div>
    
    <p>Por favor, acesse a plataforma para revisar as alterações propostas e decidir se deseja aprovar ou rejeitar a sugestão.</p>
    
    <div style="text-align: center; margin: 32px 0;">
      <a href="${process.env.FRONTEND_URL || "http://localhost:5173"}/admin/revisions" style="display: inline-block; background-color: #4f46e5; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">Avaliar Sugestão</a>
    </div>
  `;

  return baseEmailTemplate("Nova Sugestão de Revisão", content);
};

export { newRevisionTemplate };
