# OBI UEFS

Plataforma desenvolvida para gerenciar tópicos de estudo, turmas e revisões colaborativas entre instrutores, voltada para a preparação de estudantes (como para a Olimpíada Brasileira de Informática - OBI). O sistema permite a criação de conteúdo educacional, submissão de sugestões de melhoria (revisões) por outros instrutores e um fluxo completo de aprovação com notificações por e-mail.

## 🚀 Tecnologias Utilizadas

**Frontend:**
- React (Vite)
- TypeScript
- Tailwind CSS / Radix UI / Vaul (Modais responsivos)
- React Router (Navegação)
- React Markdown / MD Editor

**Backend:**
- Node.js com Express
- TypeScript
- Prisma ORM 7 (Adaptador PostgreSQL)
- Supabase (Banco de Dados em Nuvem e Pooler)
- Redis (Cache)
- Resend (Envio de E-mails)
- JWT (Autenticação e Sessão segura)

**Infraestrutura:**
- Docker & Docker Compose
- Nginx (Servidor de Produção do Frontend)
- GitHub Actions (CI/CD Automatizado)

---

## 🛠️ Ambiente de Desenvolvimento Local

Para rodar o projeto na sua máquina para desenvolvimento:

1. Clone o repositório:
   ```bash
   git clone https://github.com/Robson-Carvalho/cama-uefs.git
   cd cama-uefs
   ```

2. Crie e configure os arquivos `.env`:
   - Copie os arquivos `.env.example` (se existirem) ou configure o `.env` no `backend/` e `.env.local` no `frontend/`.

3. Suba o ambiente via Makefile:
   ```bash
   make up
   ```

4. Acesse as aplicações:
   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:3001`

---

## 📦 Deploy em Produção (VPS via GitHub Actions)

O deploy para produção está 100% automatizado utilizando **GitHub Actions**. Qualquer `push` na branch `main` irá empacotar a aplicação, enviar para a VPS via SSH e reiniciar os containers Docker já configurados para produção.

### 1. Configuração da VPS
- Certifique-se de que a sua VPS (Ubuntu) possui **Docker** e **Docker Compose** instalados.
- É recomendado usar um Proxy Reverso (como Nginx ou Caddy) na VPS para mapear as portas expostas no Docker (3001 e 5173/80) para os seus domínios públicos (ex: `api.cama-uefs.com.br` e `cama-uefs.com.br`).

### 2. Configurando o SSH para o GitHub Actions
Para que o GitHub Actions consiga acessar sua VPS, você precisa gerar um par de chaves SSH:

1. No seu computador local, gere a chave (sem colocar senha/passphrase):
   ```bash
   ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/github_actions
   ```
2. Acesse sua VPS via terminal e adicione o conteúdo da **chave pública** (`github_actions.pub`) dentro do arquivo `~/.ssh/authorized_keys`.
3. Guarde a **chave privada** (`github_actions`) para colar no GitHub no próximo passo.

### 3. Configurando os Secrets no GitHub
Vá até a página do seu repositório no GitHub em:
**Settings > Secrets and variables > Actions**

Crie os seguintes **Repository Secrets**:

#### Acesso à VPS:
- `VPS_HOST`: O IP público da sua VPS.
- `VPS_USERNAME`: O usuário do servidor (ex: `root`).
- `VPS_SSH_KEY`: O conteúdo inteiro da sua Chave Privada (incluindo as tags `BEGIN` e `END`).

#### Banco de Dados (Supabase):
- `DATABASE_URL`: URL de conexão transacional do Supabase (Porta 6543, terminando em `?pgbouncer=true`).
- `DIRECT_URL`: URL de conexão direta do Supabase (Porta 5432, usada exclusivamente para aplicar migrations).

#### Aplicação e Segurança:
- `JWT_SECRET`: Uma string secreta e segura para assinar os tokens de autenticação.
- `DEFAULT_ADMIN_EMAIL`: O e-mail do primeiro administrador do sistema.
- `DEFAULT_ADMIN_PASSWORD`: A senha do primeiro administrador do sistema.
- `RESEND_API_KEY`: Sua chave de API do serviço Resend (para disparos de e-mail).
- `MAIL_FROM`: O endereço de e-mail de remetente (ex: `cama-uefs@safeentrysistemas.com.br`).

### 4. Realizando o Deploy
Com todos os Secrets preenchidos, basta fazer o push na branch principal:

```bash
git add .
git commit -m "Deploy inicial"
git push origin main
```

O GitHub Actions irá:
1. Recriar os arquivos `.env` baseados nos seus Secrets.
2. Compactar o projeto e enviar para a pasta `/home/UEFS` na sua VPS.
3. Fazer o build do Frontend para arquivos estáticos servidos via Nginx (`prod`).
4. Subir os containers do Docker.
5. Rodar automaticamente o `prisma migrate deploy` para sincronizar o banco de dados Supabase com as mudanças mais recentes.

Você pode acompanhar o progresso na aba **Actions** do seu repositório no GitHub.

---

## 📞 Contato / Suporte
Projeto desenvolvido para OBI UEFS. Para dúvidas de infraestrutura ou bugs, abra uma Issue neste repositório.
