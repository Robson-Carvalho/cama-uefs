import { baseEmailTemplate } from "./baseEmailTemplate";

const revisionAcceptedTemplate = (
  revisorName: string,
  topicTitle: string,
  approverName: string
) => {
  const content = `
    <p>Olá, <strong>${revisorName.split(" ")[0]}</strong>,</p>
    <p>Boas notícias! Sua sugestão de edição para o tópico foi aprovada por <strong>${approverName}</strong> e já está publicada.</p>
    
    <div style="background-color: #f1f5f9; border-left: 4px solid #10b981; padding: 16px; margin: 24px 0; border-radius: 4px;">
      <p style="margin: 0; font-weight: 600; color: #1e293b;">${topicTitle}</p>
    </div>
    
    <p style="margin-bottom: 0;">Agradecemos por contribuir com a nossa plataforma. Seu esforço faz toda a diferença!</p>
  `;

  return baseEmailTemplate("Sugestão Aprovada!", content);
};

export { revisionAcceptedTemplate };
