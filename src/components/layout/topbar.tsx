"use client";

import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

import { BrandMark } from "@/components/shared/brand";
import { SupabaseStatusBadge } from "@/components/shared/supabase-status-badge";
import { appConfig, tenantConfig } from "@/config/app";
import { navigationItems } from "@/config/navigation";

type TopbarProps = {
  onOpenMenu: () => void;
  supabaseConfigured: boolean;
};

function useCurrentModuleLabel(): string | null {
  const pathname = usePathname();

  const match = navigationItems
    .filter(
      (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
    )
    .sort((a, b) => b.href.length - a.href.length)[0];

  return match?.label ?? null;
}

/** Barra superior fixa da area autenticada. */
export function Topbar({ onOpenMenu, supabaseConfigured }: TopbarProps) {
  const moduleLabel = useCurrentModuleLabel();

  return (
    <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-3 border-b border-border bg-card/90 px-4 backdrop-blur-sm sm:px-6">
      <button
        type="button"
        onClick={onOpenMenu}
        aria-label="Abrir menu"
        className="grid size-9 shrink-0 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground lg:hidden"
      >
        <Menu className="size-5" />
      </button>

      <div className="flex min-w-0 items-center gap-2.5 lg:hidden">
        <BrandMark className="size-7" />
        <span className="truncate text-sm font-semibold tracking-tight">
          {appConfig.name}
        </span>
      </div>

      <span className="hidden truncate text-sm font-medium text-muted-foreground lg:inline">
        {moduleLabel}
      </span>

      <div className="ml-auto flex shrink-0 items-center gap-3">
        <SupabaseStatusBadge configured={supabaseConfigured} />

        {/*
          Espaco reservado para o menu do usuario (avatar, perfil, sair).
          Sera implementado junto com o modulo de autenticacao.
        */}
        <span className="hidden text-xs font-medium text-muted-foreground sm:inline">
          {tenantConfig.shortName}
        </span>
      </div>
    </header>
  );
}
