import type { LucideIcon } from "lucide-react";

import { Card } from "@/components/ui/card";

type ModulePlaceholderProps = {
  /** Nome do modulo. */
  module: string;
  icon: LucideIcon;
  /** O que este modulo fara quando for implementado. */
  scope: string[];
};

/**
 * Estado vazio honesto para modulos ainda nao implementados.
 *
 * Deixa explicito que a tela e um marcador de estrutura, e nao uma
 * funcionalidade incompleta ou simulada.
 */
export function ModulePlaceholder({
  module,
  icon: Icon,
  scope,
}: ModulePlaceholderProps) {
  return (
    <Card className="border-dashed">
      <div className="flex flex-col items-start gap-5 p-6 sm:flex-row sm:items-center sm:p-8">
        <span className="grid size-12 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground">
          <Icon className="size-6" />
        </span>

        <div className="min-w-0">
          <h2 className="text-base font-semibold tracking-tight text-foreground">
            Modulo nao implementado
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            A rota e a navegacao de{" "}
            <strong className="font-medium text-foreground">{module}</strong> ja
            existem. A funcionalidade sera desenvolvida em um passo dedicado.
          </p>

          <div className="mt-4">
            <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Escopo previsto
            </p>
            <ul className="mt-2 grid gap-1.5 text-sm text-muted-foreground sm:grid-cols-2">
              {scope.map((entry) => (
                <li key={entry} className="flex items-start gap-2">
                  <span
                    aria-hidden
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-border"
                  />
                  {entry}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
}
