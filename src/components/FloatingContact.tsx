import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MessageCircle, X, Mail, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

export function FloatingContact() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname.startsWith("/admin") || location.pathname.startsWith("/auth")) {
    return null;
  }

  const goToContato = () => {
    setOpen(false);
    const scrollToEl = () => {
      const el = document.getElementById("contato");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    if (location.pathname === "/") {
      scrollToEl();
    } else {
      navigate("/#contato");
      setTimeout(scrollToEl, 350);
    }
  };

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
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-forest shrink-0" />
              <a
                href="tel:+5511940066986"
                className="text-foreground hover:text-forest transition-colors"
              >
                +55 11 94006 6986
              </a>
              <a
                href="https://wa.me/5511940066986"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Enviar mensagem no WhatsApp"
                className="ml-auto text-leaf hover:opacity-80 transition-opacity"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </a>
            </li>
          </ul>
          <button
            onClick={goToContato}
            className="mt-4 block w-full text-center bg-forest text-primary-foreground font-semibold rounded-md py-2.5 text-sm hover:bg-forest-deep transition-colors"
          >
            Preencher formulário
          </button>
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
