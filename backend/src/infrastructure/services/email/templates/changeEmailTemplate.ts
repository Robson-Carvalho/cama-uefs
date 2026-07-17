const changeEmailTemplate = (name: string, link: string) => {
  return `
    <div style="width: 100%; text-align: center; padding: 20px; background-color: #f4f4f4;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
        <tr>
          <td align="center">
            <table role="presentation" width="500px" cellspacing="0" cellpadding="0" border="0" 
              style="background-color: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px; text-align: left; font-family: Arial, sans-serif;">
              <tr>
                <td>
                  <h2 style="color: #007bff; text-align: center;">Alteração de E-mail</h2>
                  <p>Olá, <strong>${name.split(" ")[0]}</strong>,</p>
                  <p>Você solicitou a alteração do seu e-mail de acesso. Clique no link abaixo para confirmar o novo e-mail:</p>
                  <div style="text-align: center; margin: 20px 0;">
                    <a href="${link}" style="background: #007bff; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Confirmar E-mail</a>
                  </div>
                  <p>Este link é válido por apenas 15 minutos.</p>
                  <p>Se você não solicitou essa alteração, ignore este e-mail.</p>
                  <br />
                  <p style="font-size: 14px; color: #888; text-align: center;">Atenciosamente,<br/>Equipe de Suporte</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  `;
};

export { changeEmailTemplate };
