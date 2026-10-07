import {
  ClipboardList,
  LayoutDashboard,
  Package,
  Settings,
  Users,
  Wallet,
} from "lucide-react";

import type { NavSection } from "@/types/navigation";

/**
 * Navegacao principal do sistema.
 *
 * Fonte unica de verdade: a sidebar de desktop, o menu mobile e os titulos das
 * paginas derivam desta lista. Novos modulos entram aqui.
 */
export const navigation: NavSection[] = [
  {
    title: null,
    items: [
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
        exact: true,
      },
    ],
  },
  {
    title: "Operacao",
    items: [
      { label: "Clientes", href: "/clientes", icon: Users },
      {
        label: "Ordens de Servico",
        href: "/ordens-de-servico",
        icon: ClipboardList,
      },
      { label: "Estoque", href: "/estoque", icon: Package },
    ],
  },
  {
    title: "Gestao",
    items: [
      { label: "Financeiro", href: "/financeiro", icon: Wallet },
      { label: "Configuracoes", href: "/configuracoes", icon: Settings },
    ],
  },
];

/** Lista plana de todos os itens de navegacao. */
export const navigationItems = navigation.flatMap((section) => section.items);
