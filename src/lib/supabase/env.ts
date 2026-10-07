/**
 * Leitura e validacao das variaveis de ambiente do Supabase.
 *
 * As duas variaveis abaixo sao publicas por design (o prefixo NEXT_PUBLIC_ as
 * expoe ao browser). A protecao dos dados vem das politicas de Row Level
 * Security do Postgres, nunca do sigilo da chave anonima.
 *
 * A `service_role key` NAO e lida aqui e nao deve ser usada na aplicacao.
 */

export type SupabaseEnv = {
  url: string;
  anonKey: string;
};

/**
 * Retorna as credenciais do Supabase, ou `null` caso o ambiente ainda nao
 * esteja configurado. Permite que a aplicacao rode (telas, layout, navegacao)
 * antes de o projeto Supabase existir.
 */
export function getSupabaseEnv(): SupabaseEnv | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return null;
  }

  return { url, anonKey };
}

/** Indica se o Supabase esta configurado no ambiente atual. */
export function isSupabaseConfigured(): boolean {
  return getSupabaseEnv() !== null;
}

/**
 * Igual a `getSupabaseEnv`, mas lanca um erro descritivo quando o ambiente
 * nao esta configurado. Use ao instanciar um client de fato.
 */
export function requireSupabaseEnv(): SupabaseEnv {
  const env = getSupabaseEnv();

  if (!env) {
    throw new Error(
      "Supabase nao configurado. Copie `.env.example` para `.env.local` e " +
        "preencha NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    );
  }

  return env;
}
