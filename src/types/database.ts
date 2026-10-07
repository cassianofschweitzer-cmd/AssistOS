/**
 * Tipos do banco de dados.
 *
 * ESTE ARQUIVO SERA GERADO AUTOMATICAMENTE.
 *
 * Nenhuma tabela foi criada ainda — a modelagem do banco sera feita em um
 * passo dedicado, com planejamento previo. Quando o schema existir, este
 * arquivo deve ser substituido integralmente pelo resultado de:
 *
 *   npx supabase gen types typescript --project-id <PROJECT_ID> \
 *     --schema public > src/types/database.ts
 *
 * Depois disso, os clients em `src/lib/supabase/` passam a ser tipados com
 * `createServerClient<Database>(...)` / `createBrowserClient<Database>(...)`.
 *
 * Nada aqui deve ser escrito a mao: um tipo inventado daria uma falsa sensacao
 * de seguranca sobre um schema que nao existe.
 */

/** Tipo utilitario para colunas `json` / `jsonb` do Postgres. */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];
