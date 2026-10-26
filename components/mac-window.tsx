import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function MacWindowHeader({
  title,
  status,
}: {
  title: string;
  status?: string;
}) {
  return (
    <div className="mac-window-header">
      <div className="mac-window-lights" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <span className="mac-window-title">{title}</span>
      {status && <span className="mac-window-status">{status}</span>}
    </div>
  );
}

export function MacWindow({
  title,
  status,
  className,
  children,
}: {
  title: string;
  status?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("mac-window", className)}>
      <MacWindowHeader title={title} status={status} />
      {children}
    </div>
  );
}
