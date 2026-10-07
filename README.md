# AssistOS

Sistema profissional de gerenciamento para assistências técnicas.

Primeira instalação: **Smart 360 Assistência Técnica**. A arquitetura foi
preparada para evoluir para um SaaS multi-empresa (ver `src/config/app.ts`).

---

## Stack

| Camada      | Tecnologia                                     |
| ----------- | ---------------------------------------------- |
| Framework   | Next.js (App Router) + React 19                |
| Linguagem   | TypeScript (`strict`)                          |
| Estilos     | Tailwind CSS v4 (configuração CSS-first)       |
| Componentes | Padrão shadcn/ui (CVA + clsx + tailwind-merge) |
| Ícones      | lucide-react                                   |
| Backend     | Supabase (PostgreSQL + Auth)                   |
| Deploy      | Vercel                                         |

---

## Como rodar localmente

```bash
# 1. Instalar dependências
npm install

# 2. Configurar o ambiente
cp .env.example .env.local      # Windows: copy .env.example .env.local
# preencha NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY

# 3. Subir o servidor de desenvolvimento
npm run dev
```

A aplicação sobe em <http://localhost:3000> e a raiz redireciona para
`/dashboard`.

> O sistema **roda sem o Supabase configurado** nesta fase. A barra superior
> mostra um indicador de status das variáveis de ambiente.

### Scripts

| Script              | O que faz                   |
| ------------------- | --------------------------- |
| `npm run dev`       | Servidor de desenvolvimento |
| `npm run build`     | Build de produção           |
| `npm start`         | Executa o build de produção |
| `npm run lint`      | ESLint                      |
| `npm run typecheck` | `tsc --noEmit`              |
| `npm run validate`  | `typecheck` + `lint`        |
| `npm run check`     | `typecheck` + `lint` + `build` (igual ao CI) |
| `npm run db:new`    | Cria uma nova migration     |
| `npm run db:push`   | Aplica migrations pendentes no projeto vinculado |
| `npm run db:reset`  | Recria o banco local (migrations + seed) |
| `npm run db:types`  | Gera `src/types/database.ts` a partir do schema |

---

## Arquitetura

```text
src/
├── app/
│   ├── (auth)/                 # Rotas públicas
│   │   ├── layout.tsx
│   │   └── login/page.tsx
│   ├── (dashboard)/            # Área autenticada (AppShell)
│   │   ├── layout.tsx
│   │   ├── dashboard/
│   │   ├── clientes/
│   │   ├── ordens-de-servico/
│   │   ├── estoque/
│   │   ├── financeiro/
│   │   └── configuracoes/
│   ├── api/health/route.ts     # Health check
│   ├── globals.css             # Design tokens + Tailwind
│   ├── layout.tsx              # Root layout
│   ├── not-found.tsx
│   └── page.tsx                # Redireciona para /dashboard
│
├── components/
│   ├── ui/                     # Primitivos (Button, Card, Input, Badge…)
│   ├── layout/                 # AppShell, Sidebar, Topbar
│   └── shared/                 # Blocos reutilizáveis de domínio
│
├── config/                     # Configuração estática (app, navegação)
├── hooks/
├── lib/
│   ├── supabase/               # client / server / middleware / env
│   └── utils/                  # cn, formatadores
├── types/
└── middleware.ts               # Renovação de sessão do Supabase
```

### Decisões de arquitetura

- **Route groups** `(auth)` e `(dashboard)` separam layouts públicos e
  privados sem afetar as URLs.
- **`src/config/navigation.ts`** é a fonte única da navegação: sidebar
  desktop, menu mobile e o rótulo do módulo na barra superior derivam dela.
  Novos módulos entram apenas nesse arquivo.
- **`src/config/app.ts`** isola os dados da empresa. Na virada para SaaS,
  esses valores passam a vir do banco e nada mais no código muda.
- **Componentes `ui/`** seguem a convenção do shadcn/ui (mesma API, `cn()`,
  variantes com CVA) e há `components.json` configurado — então
  `npx shadcn@latest add <componente>` funciona quando for preciso. As
  dependências do Radix só serão instaladas quando um componente exigir.
- **Tema escuro**: os tokens de `.dark` já existem em `globals.css`, mas
  nenhum alternador foi implementado — a base fica pronta, inerte.

---

## Supabase

O banco é versionado em `supabase/migrations`. **Nenhuma alteração de schema é
feita manualmente no painel**: toda mudança nasce como migration, é revisada e
commitada.

```text
supabase/
├── config.toml        # Config do ambiente local (auth sem cadastro público)
├── migrations/        # Histórico do schema, em ordem cronológica
└── seed.sql           # Dados do ambiente LOCAL (db reset)
```

### Fluxo de migrations

O Supabase CLI é dependência de desenvolvimento (`npx supabase ...`).

```bash
npx supabase login                          # uma vez por máquina
npx supabase link --project-ref <PROJECT_REF>
npm run db:new -- nome_da_mudanca           # cria supabase/migrations/<ts>_nome.sql
npm run db:push                             # aplica no projeto vinculado
npm run db:types                            # regenera os tipos TypeScript
```

Para um banco local completo (requer Docker): `npx supabase start` e
`npm run db:reset`.

### Convenções do banco

- Toda tabela de negócio tem `organization_id` (multi-tenant) e RLS ativo.
- Funções auxiliares de segurança ficam no schema `private`, que não é
  exposto pela API.
- Histórico (eventos de OS, movimentações de estoque, pagamentos) é
  *append-only*: sem UPDATE/DELETE.

### Camada no código

| Arquivo                      | Uso                                           |
| ---------------------------- | --------------------------------------------- |
| `lib/supabase/env.ts`        | Leitura e validação das variáveis de ambiente |
| `lib/supabase/client.ts`     | Client para Client Components                 |
| `lib/supabase/server.ts`     | Client para Server Components / Actions       |
| `lib/supabase/middleware.ts` | Renovação de sessão por requisição            |
| `types/database.ts`          | Placeholder dos tipos gerados                 |

### Segurança

- Apenas as duas variáveis `NEXT_PUBLIC_*` são usadas. Elas são públicas por
  design; a proteção dos dados vem das políticas de **Row Level Security**.
- A `service_role key` **não** é lida em nenhum ponto da aplicação e não deve
  ser adicionada ao `.env.local`.
- `.env.local` está no `.gitignore`. Nenhuma chave existe no código.

### Tipos do banco (quando o schema existir)

```bash
npx supabase gen types typescript --project-id <PROJECT_ID> \
  --schema public > src/types/database.ts
```

Depois, tipar os clients: `createServerClient<Database>(...)`.

---

## Deploy (Vercel)

O fluxo é: push no GitHub → CI (typecheck, lint, build) → deploy automático na
Vercel.

1. Em <https://vercel.com/new>, importe o repositório
   `cassianofschweitzer-cmd/AssistOS` (framework detectado: Next.js).
2. Em **Settings → Environment Variables**, cadastre por ambiente
   (Production e Preview):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL` (URL do ambiente, ex.: `https://assistos.vercel.app`)
3. No Supabase, em **Authentication → URL Configuration**, defina o *Site URL*
   de produção e adicione as URLs de preview da Vercel em *Redirect URLs*.
4. Confira o deploy em `/api/health` (`supabaseConfigured: true`).

Nenhuma chave secreta é necessária na Vercel nesta fase.

---

## Estado atual

**Implementado**

- Fundação do projeto, arquitetura de pastas e configuração da toolchain
- Design tokens e identidade visual (claro + tokens de escuro)
- `AppShell`: sidebar fixa em desktop, menu deslizante em mobile, barra superior
- Dashboard com 4 indicadores e dois painéis — **dados fictícios**, isolados em
  `app/(dashboard)/dashboard/_data/mock-dashboard.ts`
- Placeholders honestos para os 5 módulos restantes, com o escopo previsto
- Tela de login (visual) e camada Supabase pronta para uso
- Health check em `/api/health`
- Estrutura de migrations do Supabase (`supabase/`) com a migration de
  fundação (extensões e schema `private`), sem tabelas de negócio
- CI no GitHub Actions: typecheck, lint e build a cada push e PR

**Não implementado (por decisão deste passo)**

- Autenticação (login sem envio; middleware sem redirecionamento)
- Banco de dados: nenhuma tabela, nenhuma query
- Os 16 módulos funcionais do escopo do sistema

**Pendências**

- Criar o projeto Supabase `AssistOS`, vincular (`supabase link`) e aplicar
  a migration de fundação
- Importar o repositório na Vercel e cadastrar as variáveis de ambiente

---

## Roadmap de módulos

| #   | Módulo                   | Status      |
| --- | ------------------------ | ----------- |
| 1   | Dashboard                | Layout      |
| 2   | Clientes                 | Placeholder |
| 3   | Ordens de Serviço        | Placeholder |
| 4   | Equipamentos             | Pendente    |
| 5   | Checklist de Entrada     | Pendente    |
| 6   | Orçamentos               | Pendente    |
| 7   | Serviços                 | Pendente    |
| 8   | Estoque                  | Placeholder |
| 9   | Produtos e Peças         | Pendente    |
| 10  | Fornecedores             | Pendente    |
| 11  | Financeiro               | Placeholder |
| 12  | Técnicos e Usuários      | Pendente    |
| 13  | Histórico de Atividades  | Pendente    |
| 14  | Impressão de OS          | Pendente    |
| 15  | Portal do Cliente        | Pendente    |
| 16  | Configurações da Empresa | Placeholder |
