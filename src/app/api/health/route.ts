import { NextResponse } from "next/server";

import { appConfig } from "@/config/app";
import { isSupabaseConfigured } from "@/lib/supabase/env";

/**
 * Verificacao de saude da aplicacao.
 *
 * Util para confirmar o deploy na Vercel e conferir se as variaveis de
 * ambiente do Supabase chegaram ao servidor. Nao expoe nenhum valor sensivel.
 */
export function GET() {
  return NextResponse.json({
    app: appConfig.name,
    version: appConfig.version,
    status: "ok",
    supabaseConfigured: isSupabaseConfigured(),
    timestamp: new Date().toISOString(),
  });
}
