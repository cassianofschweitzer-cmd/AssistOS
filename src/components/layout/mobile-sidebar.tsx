"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

import { SidebarContent } from "@/components/layout/sidebar";
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock";
import { cn } from "@/lib/utils/cn";

type MobileSidebarProps = {
  open: boolean;
  onClose: () => void;
};

/**
 * Menu lateral deslizante para telas pequenas.
 *
 * Implementado sem dependencias extras: fecha ao clicar no fundo, ao navegar e
 * ao pressionar Escape.
 */
export function MobileSidebar({ open, onClose }: MobileSidebarProps) {
  useBodyScrollLock(open);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  return (
    <div
      className={cn("lg:hidden", open ? "" : "pointer-events-none")}
      aria-hidden={!open}
    >
      <div
        aria-hidden
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-40 bg-black/50 transition-opacity duration-200",
          open ? "opacity-100" : "opacity-0",
        )}
      />

      <div
        role="dialog"
        aria-modal={open}
        aria-label="Menu de navegacao"
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 max-w-[85%] shadow-xl transition-transform duration-200 ease-out",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar menu"
          className="absolute top-3 right-3 z-10 grid size-8 place-items-center rounded-md text-sidebar-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <X className="size-4" />
        </button>

        <SidebarContent onNavigate={onClose} />
      </div>
    </div>
  );
}
