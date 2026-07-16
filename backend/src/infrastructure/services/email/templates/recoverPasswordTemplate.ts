const recoverPasswordTemplate = (name: string, password: string) => {
  return `
    <div style="width: 100%; text-align: center; padding: 20px; background-color: #f4f4f4;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
        <tr>
          <td align="center">
            <table role="presentation" width="500px" cellspacing="0" cellpadding="0" border="0" 
              style="background-color: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px; text-align: left; font-family: Arial, sans-serif;">
              <tr>
                <td>
                  <h2 style="color: #007bff; text-align: center;">Recuperação de Senha</h2>
                  <p>Olá, <strong>${name.split(" ")[0]}</strong>,</p>
                  <p>Você solicitou a recuperação de senha. Aqui está sua nova senha de acesso:</p>
                  <p style="background: #f4f4f4; padding: 10px; font-size: 18px; font-weight: bold; text-align: center; border-radius: 5px;">
                    ${password}
                  </p>
                  <p>Recomendamos que você altere essa senha assim que acessar sua conta.</p>
                  <p>Se você não solicitou essa alteração, entre em contato com o suporte imediatamente.</p>
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

export { recoverPasswordTemplate };
