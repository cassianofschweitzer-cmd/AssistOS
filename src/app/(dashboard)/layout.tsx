import type { ReactNode } from "react";

import { AppShell } from "@/components/layout/app-shell";
import { isSupabaseConfigured } from "@/lib/supabase/env";

/**
 * Layout da area autenticada.
 *
 * TODO (modulo de autenticacao): validar a sessao aqui (ou no middleware) e
 * redirecionar visitantes anonimos para `/login`.
 */
export default function DashboardLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <AppShell supabaseConfigured={isSupabaseConfigured()}>{children}</AppShell>
  );
}
