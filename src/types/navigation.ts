import type { LucideIcon } from "lucide-react";

export type NavItem = {
  /** Rotulo exibido na navegacao. */
  label: string;
  /** Rota da aplicacao. */
  href: string;
  /** Icone (lucide-react). */
  icon: LucideIcon;
  /**
   * Quando `true`, o item so fica ativo na correspondencia exata da rota.
   * Use para rotas raiz que sao prefixo de outras.
   */
  exact?: boolean;
};

export type NavSection = {
  /** Titulo do grupo. `null` renderiza o grupo sem cabecalho. */
  title: string | null;
  items: NavItem[];
};
