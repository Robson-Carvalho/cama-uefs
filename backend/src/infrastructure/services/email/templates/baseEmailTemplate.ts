export const baseEmailTemplate = (title: string, content: string) => {
  return `
    <div style="background-color: #f8fafc; padding: 40px 20px; font-family: 'Inter', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
        <tr>
          <td align="center">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" 
              style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; width: 100%; max-width: 600px; text-align: left; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);">
              
              <!-- Header Bar -->
              <tr>
                <td style="background-color: #4f46e5; padding: 24px 32px; text-align: center;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">OBI-UEFS</h1>
                </td>
              </tr>
              
              <!-- Body -->
              <tr>
                <td style="padding: 40px 32px;">
                  <h2 style="color: #1e293b; margin-top: 0; margin-bottom: 24px; font-size: 20px; font-weight: 600;">${title}</h2>
                  <div style="color: #475569; font-size: 16px; line-height: 1.6;">
                    ${content}
                  </div>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="background-color: #f1f5f9; padding: 24px 32px; text-align: center; border-top: 1px solid #e2e8f0;">
                  <p style="margin: 0; color: #64748b; font-size: 13px;">
                    Este é um e-mail automático enviado pela plataforma OBI-UEFS.<br/>
                    Por favor, não responda a este e-mail.
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </div>
  `;
};
