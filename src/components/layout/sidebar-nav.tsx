"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { navigation } from "@/config/navigation";
import { cn } from "@/lib/utils/cn";
import type { NavItem } from "@/types/navigation";

function isItemActive(item: NavItem, pathname: string): boolean {
  if (item.exact) return pathname === item.href;
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

type SidebarNavProps = {
  /** Chamado ao clicar em um item — usado para fechar o menu em mobile. */
  onNavigate?: () => void;
};

/** Lista de navegacao. Compartilhada entre a sidebar de desktop e o menu mobile. */
export function SidebarNav({ onNavigate }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Navegacao principal" className="flex flex-col gap-6 px-3">
      {navigation.map((section, index) => (
        <div
          key={section.title ?? `section-${index}`}
          className="flex flex-col gap-1"
        >
          {section.title ? (
            <p className="px-2.5 pb-1 text-[0.6875rem] font-semibold tracking-wider text-sidebar-muted-foreground uppercase">
              {section.title}
            </p>
          ) : null}

          {section.items.map((item) => {
            const active = isItemActive(item, pathname);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
                )}
              >
                <Icon
                  className={cn(
                    "size-4 shrink-0 transition-colors",
                    active
                      ? "text-sidebar-accent-foreground"
                      : "text-sidebar-muted-foreground group-hover:text-sidebar-accent-foreground",
                  )}
                />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
}
