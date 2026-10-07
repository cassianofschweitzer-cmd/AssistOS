import type { LucideIcon } from "lucide-react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils/cn";
import type { StatusTone } from "@/types";

const toneStyles: Record<StatusTone, { icon: string; accent: string }> = {
  neutral: { icon: "bg-muted text-muted-foreground", accent: "bg-border" },
  primary: { icon: "bg-primary/10 text-primary", accent: "bg-primary" },
  success: { icon: "bg-success/10 text-success", accent: "bg-success" },
  warning: {
    icon: "bg-warning/20 text-warning-foreground",
    accent: "bg-warning",
  },
  danger: {
    icon: "bg-destructive/10 text-destructive",
    accent: "bg-destructive",
  },
  info: { icon: "bg-info/10 text-info", accent: "bg-info" },
};

type StatCardProps = {
  label: string;
  value: string | number;
  /** Texto auxiliar abaixo do valor. */
  hint?: string;
  icon: LucideIcon;
  tone?: StatusTone;
  className?: string;
};

/** Card de indicador numerico usado no dashboard. */
export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  tone = "neutral",
  className,
}: StatCardProps) {
  const styles = toneStyles[tone];

  return (
    <Card className={cn("relative overflow-hidden", className)}>
      <span
        aria-hidden
        className={cn("absolute inset-x-0 top-0 h-0.5", styles.accent)}
      />

      <div className="flex items-start justify-between gap-4 p-5">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-muted-foreground">
            {label}
          </p>
          <p className="mt-2 text-3xl leading-none font-semibold tracking-tight text-foreground">
            {value}
          </p>
          {hint ? (
            <p className="mt-2 text-xs text-muted-foreground">{hint}</p>
          ) : null}
        </div>

        <span
          className={cn(
            "grid size-10 shrink-0 place-items-center rounded-md",
            styles.icon,
          )}
        >
          <Icon className="size-5" />
        </span>
      </div>
    </Card>
  );
}
