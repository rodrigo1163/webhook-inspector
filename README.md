# Webhook Inspector

Sistema para capturar e inspecionar requisições webhook, permitindo visualizar detalhes de requisições HTTP recebidas.

## 🚀 Tecnologias

### Backend (API)
- **Fastify** - Framework web rápido e eficiente
- **TypeScript** - Tipagem estática
- **Drizzle ORM** - ORM type-safe para PostgreSQL
- **PostgreSQL** - Banco de dados relacional
- **Zod** - Validação de schemas
- **Scalar** - Documentação interativa da API

### Frontend (Web)
- **React** - Biblioteca para interfaces
- **Vite** - Build tool e dev server
- **TypeScript** - Tipagem estática

### Infraestrutura
- **Docker Compose** - Containerização do PostgreSQL
- **pnpm** - Gerenciador de pacotes (monorepo)

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- pnpm 10.14.0
- Docker e Docker Compose

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd webhook
```

2. Instale as dependências:
```bash
pnpm install
```

3. Configure as variáveis de ambiente:
```bash
cd api
cp .env.example .env  # Se existir, ou crie um arquivo .env
```

Configure a variável `DATABASE_URL` no arquivo `.env`:
```
DATABASE_URL=postgresql://docker:docker@localhost:5432/webhooks
PORT=3333
NODE_ENV=development
```

## 🚀 Uso

### Iniciar o banco de dados

```bash
cd api
docker-compose up -d
```

### Executar migrações

```bash
cd api
pnpm db:migrate
```

### Iniciar a API

```bash
cd api
pnpm dev
```

A API estará disponível em `http://localhost:3333`
Documentação interativa em `http://localhost:3333/docs`

### Iniciar o Frontend

```bash
cd web
pnpm dev
```

O frontend estará disponível em `http://localhost:5173` (porta padrão do Vite)

## 📝 Scripts Disponíveis

### API
- `pnpm dev` - Inicia o servidor em modo desenvolvimento
- `pnpm start` - Inicia o servidor em produção
- `pnpm db:generate` - Gera migrações do banco de dados
- `pnpm db:migrate` - Executa migrações
- `pnpm db:studio` - Abre o Drizzle Studio para visualizar o banco
- `pnpm format` - Formata o código com Biome

### Web
- `pnpm dev` - Inicia o servidor de desenvolvimento
- `pnpm build` - Gera build de produção
- `pnpm preview` - Preview do build de produção

## 📊 Estrutura do Projeto

```
webhook/
├── api/                 # Backend API
│   ├── src/
│   │   ├── db/         # Configuração do banco de dados
│   │   ├── routes/     # Rotas da API
│   │   └── server.ts   # Servidor principal
│   └── docker-compose.yml
├── web/                # Frontend React
│   └── src/
└── package.json        # Configuração do monorepo
```

## 🔧 Variáveis de Ambiente

### API (.env)
- `DATABASE_URL` - URL de conexão com PostgreSQL (obrigatório)
- `PORT` - Porta do servidor (padrão: 3333)

## 📚 Documentação da API

Acesse `http://localhost:3333/docs` após iniciar a API para visualizar a documentação interativa com Scalar.

## 🗄️ Banco de Dados

O projeto utiliza PostgreSQL 17 via Docker Compose. As migrações são gerenciadas pelo Drizzle ORM.

Para visualizar o banco de dados:
```bash
cd api
pnpm db:studio
```

