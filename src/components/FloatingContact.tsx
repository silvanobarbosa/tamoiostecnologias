import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MessageCircle, X, Mail, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

export function FloatingContact() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Hide on admin and auth routes
  if (location.pathname.startsWith("/admin") || location.pathname.startsWith("/auth")) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {open && (
        <div className="bg-background border border-border rounded-2xl shadow-deep p-5 w-[280px] animate-in fade-in slide-in-from-bottom-2">
          <div className="text-xs uppercase tracking-widest text-leaf font-semibold mb-3">
            Fale com a Tamoios
          </div>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <Mail className="h-4 w-4 text-forest mt-0.5 shrink-0" />
              <a
                href="mailto:fernanda@tamoiostecnologia.com.br"
                className="text-foreground hover:text-forest transition-colors break-all"
              >
                fernanda@tamoiostecnologia.com.br
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="h-4 w-4 text-forest mt-0.5 shrink-0" />
              <a
                href="tel:+5511940066986"
                className="text-foreground hover:text-forest transition-colors"
              >
                +55 11 94006 6986{" "}
                <span className="text-leaf text-xs block">(também WhatsApp)</span>
              </a>
            </li>
          </ul>
          <Link
            to="/#contato"
            onClick={() => setOpen(false)}
            className="mt-4 block w-full text-center bg-forest text-primary-foreground font-semibold rounded-md py-2.5 text-sm hover:bg-forest-deep transition-colors"
          >
            Preencher formulário
          </Link>
        </div>
      )}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Fechar contato" : "Abrir contato"}
        className={cn(
          "h-14 w-14 rounded-full bg-forest text-primary-foreground shadow-deep flex items-center justify-center hover:bg-forest-deep transition-all hover:scale-105",
          open && "rotate-90"
        )}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </div>
  );
}
