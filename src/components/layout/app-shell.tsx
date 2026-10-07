"use client";

import { useState, type ReactNode } from "react";

import { MobileSidebar } from "@/components/layout/mobile-sidebar";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";

type AppShellProps = {
  children: ReactNode;
  supabaseConfigured: boolean;
};

/**
 * Estrutura da area autenticada: sidebar fixa em desktop, menu deslizante em
 * mobile, barra superior e area de conteudo.
 */
export function AppShell({ children, supabaseConfigured }: AppShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-svh bg-background">
      <Sidebar />
      <MobileSidebar open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="flex min-h-svh flex-col lg:pl-64">
        <Topbar
          onOpenMenu={() => setMenuOpen(true)}
          supabaseConfigured={supabaseConfigured}
        />

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="mx-auto w-full max-w-[1400px]">{children}</div>
        </main>
      </div>
    </div>
  );
}
