import Link from "next/link";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
} from "@/components/ui/empty";

type EmptyStateProps = {
  title: string;
  description?: string;
  icon?: ReactNode;
  actionLabel?: string;
  actionHref?: string;
  secondaryAction?: ReactNode;
};

export function EmptyState({
  title,
  description,
  icon,
  actionLabel,
  actionHref,
  secondaryAction,
}: EmptyStateProps) {
  return (
    <Empty className="py-12">
      <EmptyHeader>
        {icon && <EmptyMedia variant="icon">{icon}</EmptyMedia>}

        <EmptyTitle>{title}</EmptyTitle>

        {description && <EmptyDescription>{description}</EmptyDescription>}
      </EmptyHeader>

      {(actionLabel || secondaryAction) && (
        <EmptyContent className="flex gap-3">
          {actionLabel && actionHref && (
            <Button asChild>
              <Link href={actionHref}>{actionLabel}</Link>
            </Button>
          )}

          {secondaryAction}
        </EmptyContent>
      )}
    </Empty>
  );
}
