import { Badge } from "@/components/ui/badge";

type SupabaseStatusBadgeProps = {
  configured: boolean;
};

/**
 * Indica se as variaveis de ambiente do Supabase estao presentes.
 *
 * Informacao real e util nesta fase: nao verifica conectividade, apenas se
 * NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY foram definidas.
 */
export function SupabaseStatusBadge({ configured }: SupabaseStatusBadgeProps) {
  return (
    <Badge
      tone={configured ? "success" : "warning"}
      title={
        configured
          ? "Variaveis de ambiente do Supabase detectadas."
          : "Defina NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY em .env.local."
      }
    >
      <span
        aria-hidden
        className={
          configured
            ? "size-1.5 rounded-full bg-success"
            : "size-1.5 rounded-full bg-warning"
        }
      />
      Supabase {configured ? "configurado" : "nao configurado"}
    </Badge>
  );
}
