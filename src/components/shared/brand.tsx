import { cn } from "@/lib/utils/cn";
import { appConfig, tenantConfig } from "@/config/app";

type BrandProps = {
  /** Exibe o nome da empresa abaixo do nome do sistema. */
  showTenant?: boolean;
  /** Aplica o esquema de cor da sidebar (superficie escura). */
  onDark?: boolean;
  className?: string;
};

/** Marca do sistema: monograma + nome. */
export function Brand({
  showTenant = false,
  onDark = false,
  className,
}: BrandProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <BrandMark />
      <div className="flex min-w-0 flex-col">
        <span
          className={cn(
            "truncate text-sm leading-tight font-semibold tracking-tight",
            onDark ? "text-sidebar-accent-foreground" : "text-foreground",
          )}
        >
          {appConfig.name}
        </span>
        {showTenant ? (
          <span
            className={cn(
              "truncate text-xs leading-tight",
              onDark
                ? "text-sidebar-muted-foreground"
                : "text-muted-foreground",
            )}
          >
            {tenantConfig.fullName}
          </span>
        ) : null}
      </div>
    </div>
  );
}

/** Apenas o monograma, para espacos reduzidos. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "grid size-8 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground",
        className,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4"
      >
        <path d="M5 19 12 5l7 14" />
        <path d="M8.5 14h7" />
      </svg>
    </div>
  );
}
