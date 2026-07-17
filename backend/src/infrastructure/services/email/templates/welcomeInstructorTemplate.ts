const welcomeInstructorTemplate = (name: string, tempPassword: string) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
      <div style="background-color: #2563eb; color: #ffffff; padding: 20px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">Bem-vindo à CAMA/UEFS</h1>
      </div>
      <div style="padding: 30px; color: #333333;">
        <h2 style="margin-top: 0;">Olá, ${name}!</h2>
        <p style="font-size: 16px; line-height: 1.5;">
          Você foi convidado(a) para se juntar à plataforma CAMA/UEFS como instrutor(a).
          Seu cadastro foi criado com sucesso.
        </p>
        <p style="font-size: 16px; line-height: 1.5;">
          Para acessar a plataforma, utilize seu e-mail e a seguinte senha temporária:
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <span style="display: inline-block; padding: 15px 25px; font-size: 18px; font-weight: bold; font-family: monospace; color: #1e40af; background-color: #eff6ff; border-radius: 5px; border: 1px dashed #2563eb;">
            ${tempPassword}
          </span>
        </div>
        <p style="font-size: 14px; color: #d97706; background-color: #fef3c7; padding: 10px; border-radius: 5px; text-align: center;">
          <strong>Atenção:</strong> Recomendamos que você acesse as configurações da sua conta e altere essa senha assim que fizer seu primeiro login.
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.FRONTEND_URL}/admin/login" style="display: inline-block; padding: 12px 24px; font-size: 16px; font-weight: bold; color: #ffffff; background-color: #2563eb; text-decoration: none; border-radius: 5px;">
            Acessar Plataforma
          </a>
        </div>
        <p style="font-size: 16px; line-height: 1.5; margin-bottom: 0;">
          Se você não esperava por esse e-mail, por favor ignore.
        </p>
      </div>
      <div style="background-color: #f9fafb; padding: 15px; text-align: center; font-size: 12px; color: #6b7280; border-top: 1px solid #e0e0e0;">
        <p style="margin: 0;">&copy; ${new Date().getFullYear()} CAMA/UEFS. Todos os direitos reservados.</p>
      </div>
    </div>
  `;
};

export { welcomeInstructorTemplate };
