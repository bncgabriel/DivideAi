# 🧾 DivideAi

> Divida despesas com amigos e grupos de forma simples, transparente e sem complicação.

![Java](https://img.shields.io/badge/Java-21-orange?style=flat-square&logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.x-green?style=flat-square&logo=springboot)
![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)
![Docker](https://img.shields.io/badge/Docker-Compose-blue?style=flat-square&logo=docker)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue?style=flat-square&logo=postgresql)

---

## 📌 Sobre o Projeto

O **DivideAi** é uma aplicação fullstack para gerenciamento de despesas compartilhadas em grupos. Inspirado no Splitwise, permite que grupos de pessoas registrem gastos, dividam contas de forma flexível e acompanhem quem deve o quê — com gráficos, histórico e exportação em PDF.

Projeto desenvolvido para portfólio com foco em boas práticas de desenvolvimento, arquitetura limpa e experiência de usuário responsiva.

---

## ✨ Funcionalidades

- **Autenticação** — cadastro e login com JWT
- **Grupos** — criação de grupos com convite por link único
- **Despesas** — registro de gastos com divisão personalizada entre membros selecionados
- **Balanço inteligente** — algoritmo que simplifica as dívidas e mostra o mínimo de transferências necessárias
- **Histórico de pagamentos** — registro de quem pagou quem e quando
- **Gráficos** — visualização de gastos por membro e por período
- **Exportar PDF** — relatório completo do grupo para download
- **Responsivo** — compatível com mobile, tablet e desktop

---

## 🛠️ Tecnologias

| Camada | Tecnologia |
|---|---|
| Frontend | React 18, Vite, TailwindCSS, Recharts |
| Backend | Java 17, Spring Boot 3, Spring Security, JPA |
| Banco de dados | PostgreSQL 15 |
| Autenticação | JWT (JSON Web Token) |
| PDF | iText / JasperReports |
| HTTP Client | Axios |
| Infraestrutura | Docker, Docker Compose, Nginx |

---

## 🏗️ Arquitetura

```
divideai/
├── docker-compose.yml
├── backend/
│   ├── Dockerfile
│   └── src/main/java/com/divideai/
│       ├── auth/           # Login, registro, JWT
│       ├── user/           # Entidade e serviços de usuário
│       ├── group/          # Grupos e convites por link
│       ├── expense/        # Despesas e divisão entre membros
│       ├── payment/        # Registro de pagamentos
│       ├── report/         # Geração de PDF e dados para gráficos
│       └── config/         # Configurações de segurança e CORS
└── frontend/
    ├── Dockerfile
    └── src/
        ├── pages/          # Telas da aplicação
        ├── components/     # Componentes reutilizáveis
        ├── hooks/          # Custom hooks
        ├── services/       # Chamadas à API (Axios)
        └── context/        # Contexto global de autenticação
```

---

## 🗃️ Modelagem do Banco

```
users ──────────────────────────────────────────────────────────
  id | name | email | password_hash | created_at

groups ─────────────────────────────────────────────────────────
  id | name | description | owner_id (fk users) | invite_code | created_at

group_members ──────────────────────────────────────────────────
  id | group_id (fk) | user_id (fk) | joined_at

expenses ───────────────────────────────────────────────────────
  id | group_id (fk) | paid_by (fk users) | description | amount | created_at

expense_splits ─────────────────────────────────────────────────
  id | expense_id (fk) | user_id (fk) | amount_owed | is_paid | paid_at

payments ───────────────────────────────────────────────────────
  id | group_id (fk) | payer_id (fk) | receiver_id (fk) | amount | created_at
```

---

## 🔌 Endpoints da API

```
# Autenticação
POST   /auth/register
POST   /auth/login

# Grupos
GET    /groups
POST   /groups
GET    /groups/:id
DELETE /groups/:id
GET    /groups/:id/invite
POST   /groups/join/:invite_code

# Membros
GET    /groups/:id/members
DELETE /groups/:id/members/:userId

# Despesas
GET    /groups/:id/expenses
POST   /groups/:id/expenses
DELETE /groups/:id/expenses/:expenseId

# Balanço e Pagamentos
GET    /groups/:id/balances
POST   /groups/:id/payments

# Relatórios
GET    /groups/:id/report/pdf
GET    /groups/:id/report/charts
```

---

## 🧮 Algoritmo de Balanço

O ponto central do projeto. Para cada grupo:

1. Calcula o total pago por cada membro
2. Calcula o total que cada membro deveria ter pago (baseado nas divisões)
3. Encontra o saldo líquido de cada pessoa (pagou a mais ou a menos)
4. Aplica o algoritmo de simplificação de dívidas — minimiza o número de transferências necessárias

**Exemplo:**
```
Despesa de R$ 90,00 dividida igualmente entre Ana, Bob e Carol (R$ 30,00 cada)
Ana pagou R$ 90,00 → saldo: +R$ 60,00
Bob pagou R$ 0,00  → saldo: -R$ 30,00
Carol pagou R$ 0,00 → saldo: -R$ 30,00

Resultado:
→ Bob deve R$ 30,00 para Ana
→ Carol deve R$ 30,00 para Ana
```

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- [Docker](https://www.docker.com/) e Docker Compose instalados

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/divideai.git
cd divideai

# 2. Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com suas configurações

# 3. Suba todos os containers
docker compose up --build

# 4. Acesse a aplicação
# Frontend: http://localhost
# Backend:  http://localhost:8080
# API Docs: http://localhost:8080/swagger-ui.html
```

---

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto baseado no `.env.example`:

```env
# Banco de dados
POSTGRES_DB=divideai
POSTGRES_USER=divideai_user
POSTGRES_PASSWORD=sua_senha_aqui

# Backend
JWT_SECRET=seu_jwt_secret_aqui
JWT_EXPIRATION=86400000

# Frontend
VITE_API_URL=http://localhost:8080
```

---

## 📸 Telas

| Tela | Descrição |
|---|---|
| Dashboard | Visão geral dos grupos e saldo pessoal |
| Grupo | Membros, despesas e balanço do grupo |
| Adicionar Despesa | Formulário com seleção de quem divide |
| Gráficos | Gastos por membro e por período |
| Relatório PDF | Exportação completa do histórico |

---

## 📋 Roadmap

- [x] Autenticação com JWT
- [x] CRUD de grupos com convite por link
- [x] Cadastro de despesas com divisão personalizada
- [x] Algoritmo de simplificação de dívidas
- [x] Histórico de pagamentos
- [x] Gráficos de gastos
- [x] Exportação de PDF
- [ ] Notificações por e-mail
- [ ] Modo escuro
- [ ] App mobile (React Native)

---

## 🤔 Decisões Técnicas

**Por que Spring Boot e não Node.js?**
Spring Boot oferece uma estrutura robusta para APIs REST com segurança configurável via Spring Security, tipagem forte e ecossistema maduro para projetos corporativos.

**Por que PostgreSQL e não MySQL?**
PostgreSQL tem suporte nativo a tipos avançados, melhor performance em queries complexas e é amplamente adotado no mercado.

**Por que TailwindCSS e não Material UI?**
Tailwind permite construir interfaces responsivas e customizadas sem sobrescrever estilos de componentes prontos, resultando em um design mais original.

**Por que Docker Compose?**
Garante que qualquer pessoa consiga rodar o projeto com um único comando, sem se preocupar com versões de Java, Node ou PostgreSQL instaladas na máquina.

---

## 👨‍💻 Autores

Feito por **[Gabriel Benicio](https://github.com/seu-usuario)** e **[Manuela Aimê](https://github.com/seu-usuario)**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-gabriel--benicio-blue?style=flat-square&logo=linkedin)](https://linkedin.com/in/gabriel-benicioo)
[![GitHub](https://img.shields.io/badge/GitHub-bcngabriel-black?style=flat-square&logo=github)](https://github.com/bncgabriel)

[![LinkedIn](https://img.shields.io/badge/LinkedIn-manuela--aimê-blue?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/manuelaaime/)
[![GitHub](https://img.shields.io/badge/GitHub-manuelaime-black?style=flat-square&logo=github)](https://github.com/manuelaaime)

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
