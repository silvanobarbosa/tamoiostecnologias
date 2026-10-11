import { Link, useLocation } from "react-router-dom";
import { Handshake, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function FloatingRepresentative() {
  const location = useLocation();
  const path = location.pathname;

  if (
    path.startsWith("/admin") ||
    path.startsWith("/auth") ||
    path.startsWith("/modelo-slides") ||
    path.startsWith("/seja-representante")
  ) {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <Link
        to="/seja-representante"
        aria-label="Seja um representante Tamoios"
        className={cn(
          "group inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground",
          "shadow-leaf px-4 py-3 font-semibold text-sm",
          "hover:bg-accent/90 transition-all hover:scale-[1.03]"
        )}
      >
        <Handshake className="h-5 w-5 shrink-0" />
        <span className="hidden sm:inline">Seja um Representante</span>
        <ArrowRight className="hidden sm:inline h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}
