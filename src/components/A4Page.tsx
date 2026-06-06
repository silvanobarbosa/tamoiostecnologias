import { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * A4 page wrapper. On screen: rendered as a centered card. On print: each page
 * becomes a full A4 sheet with no margins (the page content owns its padding).
 */
export function A4Page({
  children,
  className,
  bleed = false,
}: {
  children: ReactNode;
  className?: string;
  /** If true, content fills the page edge-to-edge (no inner padding). */
  bleed?: boolean;
}) {
  return (
    <section
      className={cn(
        "a4-page relative bg-background text-foreground overflow-hidden",
        !bleed && "p-[14mm]",
        className,
      )}
    >
      {children}
    </section>
  );
}

/** Wraps a sequence of A4Page elements, applies print rules and screen layout. */
export function A4Document({ children }: { children: ReactNode }) {
  return (
    <>
      <style>{`
        @page { size: A4; margin: 0; }
        .a4-page {
          width: 210mm;
          height: 297mm;
          page-break-after: always;
          break-after: page;
        }
        .a4-page:last-child { page-break-after: auto; break-after: auto; }
        @media screen {
          .a4-doc { background: hsl(var(--muted)); padding: 24px 0; }
          .a4-page {
            margin: 0 auto 24px;
            box-shadow: 0 10px 40px -10px rgba(0,0,0,0.25);
          }
        }
        @media print {
          html, body { background: white !important; }
          .a4-no-print { display: none !important; }
          .a4-doc { background: white; padding: 0; }
          .a4-page { box-shadow: none !important; margin: 0 !important; }
        }
      `}</style>
      <div className="a4-doc">{children}</div>
    </>
  );
}
