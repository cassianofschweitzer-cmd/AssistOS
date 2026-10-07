import type { ReactNode } from "react";

import { Brand } from "@/components/shared/brand";
import { appConfig, tenantConfig } from "@/config/app";

const highlights = [
  "Ordens de servico do recebimento a entrega",
  "Checklist de entrada e historico por equipamento",
  "Estoque de pecas integrado ao atendimento",
  "Controle financeiro da operacao",
];

/** Layout das telas publicas de autenticacao. */
export default function AuthLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <section className="hidden flex-col justify-between bg-sidebar p-10 lg:flex">
        <Brand onDark />

        <div className="max-w-md">
          <h2 className="text-2xl leading-snug font-semibold tracking-tight text-sidebar-accent-foreground">
            Gestao completa da assistencia tecnica, em um unico sistema.
          </h2>
          <ul className="mt-8 space-y-3">
            {highlights.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm text-sidebar-foreground"
              >
                <span
                  aria-hidden
                  className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs text-sidebar-muted-foreground">
          {appConfig.name} v{appConfig.version} — {tenantConfig.fullName}
        </p>
      </section>

      <section className="flex items-center justify-center px-6 py-12 sm:px-10">
        <div className="w-full max-w-sm">{children}</div>
      </section>
    </div>
  );
}
