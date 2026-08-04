import { baseEmailTemplate } from "./baseEmailTemplate";

const revisionRejectedTemplate = (
  revisorName: string,
  topicTitle: string,
  approverName: string
) => {
  const content = `
    <p>Olá, <strong>${revisorName.split(" ")[0]}</strong>,</p>
    <p>Sua sugestão de edição para o tópico abaixo não foi aprovada por <strong>${approverName}</strong> no momento.</p>
    
    <div style="background-color: #f1f5f9; border-left: 4px solid #ef4444; padding: 16px; margin: 24px 0; border-radius: 4px;">
      <p style="margin: 0; font-weight: 600; color: #1e293b;">${topicTitle}</p>
    </div>
    
    <p style="margin-bottom: 0;">De qualquer forma, agradecemos muito pelo seu esforço e dedicação em tentar melhorar a plataforma. Continue contribuindo!</p>
  `;

  return baseEmailTemplate("Sugestão Rejeitada", content);
};

export { revisionRejectedTemplate };
