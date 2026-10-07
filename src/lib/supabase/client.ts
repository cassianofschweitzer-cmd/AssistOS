"use client";

import { createBrowserClient } from "@supabase/ssr";

import { requireSupabaseEnv } from "./env";

/**
 * Client Supabase para uso em Client Components.
 *
 * TODO (proximo passo do banco de dados): tipar com os tipos gerados —
 * `createBrowserClient<Database>(...)` — apos rodar
 * `npx supabase gen types typescript --project-id <id> > src/types/database.ts`.
 */
export function createSupabaseBrowserClient() {
  const { url, anonKey } = requireSupabaseEnv();
  return createBrowserClient(url, anonKey);
}
