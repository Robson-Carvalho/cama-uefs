<div align="center">
  <h1>💡 CAMA UEFS</h1>

  ![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
  ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)
  ![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)
  ![Prisma](https://img.shields.io/badge/Prisma-3982CE?logo=Prisma&logoColor=white)
  ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase&logoColor=white)
  ![Docker](https://img.shields.io/badge/Docker-2CA5E0?logo=docker&logoColor=white)
  [![Deploy](https://github.com/Robson-Carvalho/cama-uefs/actions/workflows/release.yml/badge.svg)](https://github.com/Robson-Carvalho/cama-uefs/actions/workflows/release.yml)
</div>

<p align="center">
  Plataforma educacional avançada para gerenciamento de tópicos de estudo, turmas e revisões colaborativas entre instrutores, idealizada para o treinamento de excelência de estudantes para competições como a <strong>Olimpíada Brasileira de Informática (OBI)</strong>.
</p>

<p align="center">
  <a href="#-sobre-o-projeto">Sobre</a> •
  <a href="#-tecnologias">Tecnologias</a> •
  <a href="#-ambiente-local">Desenvolvimento</a> •
  <a href="#-deploy-e-produção">Deploy</a> •
  <a href="#-contato">Contato</a>
</p>

---

## 🎯 Sobre o Projeto

O **OBI UEFS** é um ecossistema projetado para promover a criação e a validação de conteúdo educacional de alta qualidade. Através de um fluxo robusto, instrutores podem criar materiais, submeter sugestões de melhoria (revisões) e aprovar mudanças, tudo suportado por notificações em tempo real via e-mail.

### Principais Recursos
- **Gestão de Tópicos e Turmas**: Organização estruturada de conteúdo para diferentes níveis de aprendizado.
- **Fluxo de Revisão Colaborativa**: Instrutores podem sugerir e validar melhorias em materiais existentes.
- **Notificações Inteligentes**: Integração com Resend para avisos automáticos sobre atualizações e aprovações de conteúdo.
- **Editor Markdown Avançado**: Criação de materiais ricos com renderização de código e fórmulas em tempo real.

---

## 🚀 Tecnologias

O projeto utiliza um stack moderno, garantindo performance, tipagem estática ponta a ponta e escalabilidade.

### 🎨 Frontend
- **Framework**: React (Vite) com TypeScript
- **Estilização**: Tailwind CSS integrado com Radix UI
- **Componentes Avançados**: Vaul (para modais responsivos)
- **Roteamento & Conteúdo**: React Router, React Markdown e MD Editor

### ⚙️ Backend
- **Core**: Node.js com Express e TypeScript
- **Banco de Dados**: PostgreSQL hospedado no Supabase (com Pooler)
- **ORM**: Prisma ORM 7
- **Cache & Filas**: Redis
- **Serviços**: Resend (E-mails) e JWT (Autenticação / Sessão Segura)

### 🏗️ Infraestrutura & DevOps
- **Conteinerização**: Docker & Docker Compose
- **Servidor Web**: Nginx
- **CI/CD**: GitHub Actions (Integração e Entrega Contínuas)

---

## 🛠️ Ambiente Local (Desenvolvimento)

Siga os passos abaixo para executar a plataforma localmente.

### Pré-requisitos
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/) instalados.
- [Make](https://www.gnu.org/software/make/) instalado no seu sistema.

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Robson-Carvalho/cama-uefs.git
   cd cama-uefs
   ```

2. **Configure as Variáveis de Ambiente:**
   Crie os arquivos baseando-se nos exemplos fornecidos:
   - No diretório `backend/`: configure o arquivo `.env`.
   - No diretório `frontend/`: configure o arquivo `.env.local`.

3. **Inicie os Serviços:**
   ```bash
   make up
   ```

4. **Acesse a Aplicação:**
   - 🌐 Frontend: [http://localhost:5173](http://localhost:5173)
   - 🔌 Backend API: [http://localhost:3001](http://localhost:3001)

---

## 📦 Deploy e Produção

A aplicação conta com um pipeline de **CI/CD 100% automatizado** via GitHub Actions. Qualquer commit na branch `main` dispara o build, provisionamento e deploy automático na VPS configurada.

### 1. Requisitos da VPS
- SO Linux (Recomendado: Ubuntu)
- Docker e Docker Compose instalados.
- Recomendável um Proxy Reverso (Nginx/Caddy) gerenciando portas e certificados SSL (mapeando as portas 3001 e 5173/80).

### 2. Configurando o SSH (GitHub Actions -> VPS)
Gere um par de chaves SSH dedicado para o deploy contínuo na sua máquina local:
```bash
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/github_actions
```
> Adicione o conteúdo da **chave pública** (`github_actions.pub`) no arquivo `~/.ssh/authorized_keys` da sua VPS.

### 3. Segredos do GitHub (Secrets)
No repositório do GitHub, navegue até **Settings > Secrets and variables > Actions** e cadastre as seguintes chaves:

<details>
<summary><strong>🔑 Acesso à VPS</strong></summary>

- `VPS_HOST`: O IP público da sua VPS.
- `VPS_USERNAME`: O usuário de acesso ao servidor (ex: `root` ou `ubuntu`).
- `VPS_SSH_KEY`: O conteúdo integral da sua Chave Privada.
</details>

<details>
<summary><strong>🗄️ Banco de Dados (Supabase)</strong></summary>

- `DATABASE_URL`: URL transacional (geralmente porta 6543 com `?pgbouncer=true`).
- `DIRECT_URL`: URL de conexão direta (porta 5432, para `prisma migrate`).
</details>

<details>
<summary><strong>🛡️ Aplicação e Segurança</strong></summary>

- `JWT_SECRET`: Chave forte para assinatura de tokens.
- `DEFAULT_ADMIN_EMAIL`: E-mail para criação do primeiro usuário administrador.
- `DEFAULT_ADMIN_PASSWORD`: Senha do primeiro administrador.
- `RESEND_API_KEY`: Token de integração do serviço Resend.
- `MAIL_FROM`: Endereço de remetente oficial (ex: `no-reply@cama-uefs.com.br`).
</details>

### 4. Iniciando o Deploy Automático
Após preencher as variáveis, basta empurrar o código para a branch principal:
```bash
git add .
git commit -m "feat: setup inicial para deploy"
git push origin main
```
**O que o pipeline faz?**
1. Recria dinamicamente os `.env` com base nas Secrets.
2. Transfere os arquivos de forma segura (SCP) para `/home/UEFS`.
3. Compila a aplicação e orquestra a subida dos containers com `docker compose`.
4. Aplica as migrações mais recentes no banco (`prisma migrate deploy`).

---

## 📞 Contato & Suporte

Este projeto foi desenvolvido de forma dedicada para as demandas da OBI UEFS.
Em caso de dúvidas de infraestrutura ou relatos de bugs, sinta-se à vontade para [abrir uma Issue](https://github.com/Robson-Carvalho/cama-uefs/issues) neste repositório.
