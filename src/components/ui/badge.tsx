import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils/cn";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-medium whitespace-nowrap",
  {
    variants: {
      tone: {
        neutral: "border-border bg-muted text-muted-foreground",
        primary:
          "border-transparent bg-primary/10 text-primary dark:bg-primary/15",
        success:
          "border-transparent bg-success/10 text-success dark:bg-success/20",
        warning:
          "border-transparent bg-warning/20 text-warning-foreground dark:bg-warning/20 dark:text-warning",
        danger:
          "border-transparent bg-destructive/10 text-destructive dark:bg-destructive/15",
        info: "border-transparent bg-info/10 text-info dark:bg-info/15",
      },
    },
    defaultVariants: {
      tone: "neutral",
    },
  },
);

type BadgeProps = React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants>;

function Badge({ className, tone, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />;
}

export { Badge, badgeVariants };
export type { BadgeProps };
