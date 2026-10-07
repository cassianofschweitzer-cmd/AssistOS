import { appConfig } from "@/config/app";
import { Brand } from "@/components/shared/brand";
import { SidebarNav } from "@/components/layout/sidebar-nav";

type SidebarProps = {
  /** Chamado quando um item de navegacao e clicado (fecha o menu em mobile). */
  onNavigate?: () => void;
};

/** Conteudo da barra lateral. Reutilizado no menu deslizante de mobile. */
export function SidebarContent({ onNavigate }: SidebarProps) {
  return (
    <div className="flex h-full flex-col bg-sidebar">
      <div className="flex h-14 shrink-0 items-center border-b border-sidebar-border px-4">
        <Brand showTenant onDark />
      </div>

      <div className="scrollbar-thin flex-1 overflow-y-auto py-5">
        <SidebarNav onNavigate={onNavigate} />
      </div>

      <div className="shrink-0 border-t border-sidebar-border px-4 py-3">
        <p className="text-[0.6875rem] text-sidebar-muted-foreground">
          {appConfig.name} v{appConfig.version}
        </p>
      </div>
    </div>
  );
}

/** Sidebar fixa — visivel apenas em telas grandes. */
export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-sidebar-border lg:block">
      <SidebarContent />
    </aside>
  );
}
