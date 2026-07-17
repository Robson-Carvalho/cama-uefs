# ============================================================
# OBI UEFS — Makefile
# Atalhos para o ambiente Docker (backend + frontend + postgres)
# ============================================================

DC      := docker compose
BACKEND  := obi-uefs-backend
FRONTEND := obi-uefs-frontend
POSTGRES := obi-uefs-postgres

.DEFAULT_GOAL := help

# ------------------------------------------------------------
# Ajuda
# ------------------------------------------------------------
.PHONY: help
help: ## Exibe esta mensagem de ajuda
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) \
		| awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'

# ------------------------------------------------------------
# Ciclo de vida dos containers
# ------------------------------------------------------------
.PHONY: up
up: ## Sobe todos os serviços em background
	$(DC) up -d

.PHONY: down
down: ## Para e remove os containers (preserva volumes)
	$(DC) down

.PHONY: restart
restart: ## Reinicia todos os serviços
	$(DC) restart

.PHONY: stop
stop: ## Para os containers sem removê-los
	$(DC) stop

# ------------------------------------------------------------
# Build
# ------------------------------------------------------------
.PHONY: build
build: ## Reconstrói as imagens de todos os serviços
	$(DC) build

.PHONY: build-backend
build-backend: ## Reconstrói apenas a imagem do backend
	$(DC) build backend

.PHONY: build-frontend
build-frontend: ## Reconstrói apenas a imagem do frontend
	$(DC) build frontend

.PHONY: rebuild
rebuild: ## Para tudo, reconstrói e sobe novamente
	$(DC) down
	$(DC) build --no-cache
	$(DC) up -d

.PHONY: prod
prod: ## Prepara o ambiente para produção e sobe os containers
	$(DC) down
	$(DC) build --no-cache
	$(DC) up -d

# ------------------------------------------------------------
# Logs
# ------------------------------------------------------------
.PHONY: logs
logs: ## Exibe logs de todos os serviços (follow)
	$(DC) logs -f

.PHONY: logs-backend
logs-backend: ## Exibe logs do backend (follow)
	$(DC) logs -f backend

.PHONY: logs-frontend
logs-frontend: ## Exibe logs do frontend (follow)
	$(DC) logs -f frontend

.PHONY: logs-db
logs-db: ## Exibe logs do PostgreSQL (follow)
	$(DC) logs -f postgres

# ------------------------------------------------------------
# Shell / Exec
# ------------------------------------------------------------
.PHONY: sh-backend
sh-backend: ## Abre shell no container do backend
	$(DC) exec backend sh

.PHONY: sh-frontend
sh-frontend: ## Abre shell no container do frontend
	$(DC) exec frontend sh

.PHONY: psql
psql: ## Abre o psql no container do PostgreSQL
	$(DC) exec postgres psql -U $${POSTGRES_USER:-obi_admin} -d $${POSTGRES_DB:-obi_uefs}

# ------------------------------------------------------------
# Status
# ------------------------------------------------------------
.PHONY: ps
ps: ## Lista os containers e seus status
	$(DC) ps

# ------------------------------------------------------------
# Prisma
# ------------------------------------------------------------
.PHONY: db-migrate
db-migrate: ## Aplica migrations em produção (prisma migrate deploy)
	$(DC) exec backend npx prisma migrate deploy

.PHONY: db-migrate-dev
db-migrate-dev: ## Cria e aplica nova migration em dev (prisma migrate dev)
	$(DC) exec backend npx prisma migrate dev

.PHONY: db-generate
db-generate: ## Regenera o Prisma Client (prisma generate)
	$(DC) exec backend npx prisma generate

.PHONY: db-studio
db-studio: ## Abre o Prisma Studio (porta 5555)
	$(DC) exec backend npx prisma studio --browser none

# ------------------------------------------------------------
# Limpeza
# ------------------------------------------------------------
.PHONY: clean
clean: ## Para containers e remove volumes de node_modules
	$(DC) down
	docker volume rm -f \
		obi-uefs-backend-node-modules \
		obi-uefs-frontend-node-modules

.PHONY: clean-all
clean-all: ## Para containers e remove TODOS os volumes (incluindo dados do banco)
	@echo "⚠️  Isso vai apagar os dados do banco. Pressione Ctrl+C para cancelar."
	@sleep 3
	$(DC) down -v

.PHONY: prune
prune: ## Remove imagens, containers e cache não utilizados pelo Docker
	docker system prune -f
